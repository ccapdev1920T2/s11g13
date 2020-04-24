const db = require('../models/database.js');
const Seats = require('../models/SeatsModel.js');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Users = require('../models/UsersModel.js');
const Ratings = require('../models/RatingsModel.js');

const moviesController = {
    getMovies: function(req, res, next) {
        db.findMany(Movies, {}, 'title posterUrl', movie=>{
            let movieArray = [];
            for (let i=0;i<movie.length;i++){
                movieObj = {
                        title: movie[i].title,
                        imageurl: movie[i].posterUrl
                    }
                movieArray.push(movieObj);
            }
            
            let un;
            un = (req.session.userId)? req.session.userId: '';
                
            res.render("movies", {
                pageName: "Movies",
                current: "Movies",
                movies: movieArray,
                username: un,
                error: res.locals.error
            })
        })
    }, 

    getSeats: (req, res, next)=>{
        let seatRow = [];
        db.findMany(Seats,{showID: req.body.showID},'seatNum isTaken', function(seat){
            n1=0;
            n2=8;
            for(var i=0;i<4;i++)
            {
                seatCol = [];
                for (var j=n1;j<n2;j++)
                {
                    seatObj = {
                    seatName: seat[j].seatNum,
                    isTaken: seat[j].isTaken
                    }
                    seatCol.push(seatObj); //push seatobj to seatrow
                }
                seatRow.push(seatCol);
                n1 += 8;
                n2 += 8;
            }

            let un;
            un = (req.session.userId)? req.session.userId: '';

            res.render("seats", {
                pageName: "Reserve Seats",
                seatRow: seatRow,
                showID: req.body.showID,
                username: un
            })
        })
    },

    getViewMovie: (req, res, next)=>{
        let movieDetails = {};
        
        db.findOne(Movies,{title: req.params.title},'',function(movie){
            if (movie){
                let show = [];
                let review = [];

                //movie details object
                movieDetails = {
                    id: movie._id,
                    title: movie.title,
                    genre: movie.genre,
                    moviecover: movie.posterUrl,
                    rating: movie.aveScore,
                    synopsis: movie.synopsis,
                    cast: movie.cast,
                    trailerUrl: movie.trailerUrl,
                }

                db.findMany(Shows, {movieID: movie._id}, '', function(s){
                    for (let i=0; i<s.length; i++){
                        var now = new Date(Date.now());
                        now.setHours(0,0,0,0); //set time of date.now to all 0 to match with database
                        if (s[i].date >= now)
                        {
                            var d = new Date(s[i].date); //ISODate
                            year = d.getFullYear(); //year of ISODate
                            month = d.toLocaleString('default', { month: 'long' });
                            dt = d.getDate(); //day of ISOdate
                            if (dt < 10) { //get number of days
                            dt = '0' + dt;
                            }
                            if (month < 10) { //get number of months
                            month = '0' + month;
                            }
                            dashDate = year + '-' + d.getMonth() + '-' + dt; //for sorting
                            formattedDate = month + ' ' + dt + ', ' + year; //for displaying
                            //show object
                            showObj = 
                                {
                                    showID: s[i]._id,
                                    date: formattedDate,
                                    title: movieDetails.title,
                                    imageurl: movieDetails.moviecover,
                                }
                            show.push(showObj); //push object to array
                        }
                    }
                })

                Ratings.find({movieID: movie._id}).populate('userID').exec().then(r=>{
                        
                    for (let i=0;i<r.length;i++)
                    {
                        var d = new Date(r[i].date); //ISODate
                        year = d.getFullYear(); //year of ISODate
                        month = d.toLocaleString('default', { month: 'long' });
                        dt = d.getDate(); //day of ISOdate
                        if (dt < 10) { //get number of days
                        dt = '0' + dt;
                        }
                        if (month < 10) { //get number of months
                        month = '0' + month;
                        }
                        formattedDate = month + ' ' + dt + ', ' + year; //for displaying 
                        //review object
                        reviewObj = 
                            {
                                fName: r[i].userID.firstName,
                                lName: r[i].userID.lastName,
                                username: r[i].userID.username,
                                profilepic: r[i].userID.pic,
                                date: formattedDate,
                                rating: r[i].starRating,
                                commentTitle: r[i].commenttitle,
                                comment: r[i].comment,
                            }
                        review.push(reviewObj); //push object to array
                    }

                        let un;
                        un = (req.session.userId)? req.session.userId: '';

                        res.render("movie-view", {
                            pageName: movieDetails.title,
                            movieDetails: movieDetails,
                            review: review,
                            movies: show,
                            username: un
                        });
                })
            }
            else
                return res.redirect('/');
            
        })
    },
    
    getSearch: (req, res, next)=>{
        db.findOne(Movies, {title: req.query.movieTitle}, '', result=>{
            console.log(result)
            if (result){
                return res.redirect('/movies/view/' + req.query.movieTitle);
            }
            else{
                let notfound = "No movie found with title \"" + req.query.movieTitle +"\""
                res.locals.error = notfound;
                return next();
            }
        })
    },

    postAddReview: (req, res, next)=>{
        var rate = req.body.rating;
        var reviewTitle = req.body.ReviewTitle;
        var review = req.body.Review;
        var movieTitle = req.body.movieTitle;
        var userID = '';

        console.log(rate);
        console.log(reviewTitle);
        console.log(review);

        db.findOne(Users, {username: req.session.userId}, '', function(user){
            userID = user._id;
        })
        
        db.findOne(Movies, {_id: movieTitle},'',function(movie){
            if (movie){
                console.log("movie found!");
                var d = new Date();
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var date = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
                // console.log(date.toString());
                
                db.insertOne(Ratings,{
                    userID: userID,
                    movieID: movie._id,
                    date: date,
                    starRating: rate,
                    commentTitle: reviewTitle,
                    comment: review,
                },result=>{
                    if (result){
                        console.log("Successfully added document to Ratings collection.");
                        db.findMany(Ratings, {movieID: movie._id}, '', function(r){
                            var total = 0;
        
                            for (let i=0; i<r.length; i++){
                                total = total + r[i].starRating;
                                console.log(total);
                            }
        
                            total = total/r.length;
                            console.log(total);
        
                            db.updateOne(Movies,{_id: movie._id},{
                                aveScore: total
                            }, result=>{
                                if (result)
                                    console.log("Successfully changed starRating of Movie");
                                else console.log("Error updating starRating of Movie");
                            });
        
                        })
                    }
                    else console.log("Error inserting to Ratings collection");
                });
             
                return res.redirect('/movies/view/' + movie.title);
            }
            else{
                console.log(req.body.movieTitle);    
            }
        })
    },

    
};



module.exports = moviesController;
