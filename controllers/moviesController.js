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
                username: un
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
            Shows.find({movieID: movie._id}).populate('movieID').exec().then(s=>{
                let show = [];
                for (let i=0;i<s.length;i++)
                {
                    if (s[i].date >= new Date(Date.now()))
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
                                title: movie.title,
                                imageurl: s[i].movieID.posterUrl,
                            }
                        show.push(showObj); //push object to array
                    }
                }

                //sort ascending order movie date
                show.sort(function(a,b){
                  return new Date(a.date) - new Date(b.date);
                });

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

                db.findMany(Users,{},'',function(user){
                    Ratings.find({movieID: movie._id, userID: user._id}).populate('movieID').populate('userID').exec().then(r=>{
                        let review = [];
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

                            //sort ascending order movie date
                            show.sort(function(a,b){
                              return new Date(a.date) - new Date(b.date);
                            });


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
                })
            })
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
                    if (result)
                        console.log("Successfully added document to Shows collection.");
                    else console.log("Error inserting to Shows collection");
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
