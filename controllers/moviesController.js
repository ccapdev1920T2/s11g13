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
                        id: movie[i]._id,
                        imageurl: movie[i].posterUrl
                    }
                movieArray.push(movieObj);
            }

            movieArray = quick_Sort(movieArray);
            
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
      
        db.findOne(Movies,{_id: req.params.movieID},'',function(movie){
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
                    var flag = false;
                    var userReviewObj = {};
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
                        if (r[i].userID.username == req.session.userId){
                            flag = true;
                            userReviewObj ={
                                fName: r[i].userID.firstName,
                                lName: r[i].userID.lastName,
                                username: r[i].userID.username,
                                profilepic: r[i].userID.pic,
                                date: formattedDate,
                                rating: r[i].starRating,
                                commentTitle: r[i].commentTitle,
                                comment: r[i].comment,
                            }
                        } else{
                            reviewObj = 
                            {
                                fName: r[i].userID.firstName,
                                lName: r[i].userID.lastName,
                                username: r[i].userID.username,
                                profilepic: r[i].userID.pic,
                                date: formattedDate,
                                rating: r[i].starRating,
                                commentTitle: r[i].commentTitle,
                                comment: r[i].comment,
                            }
                            review.push(reviewObj); //push object to array
                        }
                    }

                        let un;
                        un = (req.session.userId)? req.session.userId: '';

                        res.render("movie-view", {
                            pageName: movieDetails.title,
                            movieDetails: movieDetails,
                            review: review,
                            movies: show,
                            username: un,
                            flag: flag,
                            userRev: userReviewObj,
                        });
                })
            }
            else
                return res.redirect('/');
            
        })
    },
    
    getSearch: (req, res, next)=>{
        var search = req.query.movieTitle.toUpperCase();

        db.findMany(Movies, {}, '', function(movie){
            if (movie){
                var match = [];
                for(let i=0; i<movie.length; i++){
                    if (movie[i].title.toUpperCase().search(search) != -1){
                        movieObj = {
                            title: movie[i].title,
                            id: movie[i]._id,
                            imageurl: movie[i].posterUrl
                        }
                        match.push(movieObj);
                    }
                }

                if (match.length>=1){     
                    match = quick_Sort(match);
                    
                    let un;
                    un = (req.session.userId)? req.session.userId: '';                     
                    res.render("movies", {
                        pageName: "Movies",
                        current: "Movies",
                        movies: match,
                        username: un,
                        error: res.locals.error
                    })
                }
                else{
                    let notfound = "No movie found with title \"" + req.query.movieTitle +"\""
                    res.locals.error = notfound;
                    return next();
                }
            }
        })
    },

    postAddReview: (req, res, next)=>{
        var rate = req.body.rating;
        var reviewTitle = req.body.ReviewTitle;
        var review = req.body.Review;
        var movie_id = req.body.movieTitle;
        var userID = '';

        // console.log(rate);
        // console.log(reviewTitle);
        // console.log(review);

        db.findOne(Users, {username: req.session.userId}, '', function(user){
            userID = user._id;
        })
        
        db.findOne(Movies, {_id: movie_id},'',function(movie){
            if (movie){
                //console.log("movie found!");
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
                        //updateStarRating(movie._id);
                        db.findMany(Ratings, {movieID: movie._id}, '', function(r){
                            if (r){
                                var total = 0;
                                for (let i=0; i<r.length; i++){
                                    total = total + r[i].starRating;
                                }
                                
                                total = (total/r.length).toFixed(1);
                    
                                db.updateOne(Movies,{_id: movie._id},{
                                    aveScore: total
                                }, result=>{
                                    if (result)
                                        console.log("Successfully changed starRating of Movie");
                                    else console.log("Error updating starRating of Movie");
                                });
                            }
                            else console.log("Error finding ratings of Movie");  
                        });

                        return res.redirect('/movies/view/' + movie._id);
                    }
                    else console.log("Error inserting to Ratings collection");
                });
            }
            else{
                //console.log(req.body.movieTitle);
                console.log('Movie not found!')    
            }
        })
    },

    deleteReview: (req, res, next)=>{
        var movieID = req.body.movieID;
        
        db.findOne(Users, {username: req.session.userId}, '', function(user){
            db.deleteOne(Ratings, {"movieID": movieID, "userID": user._id}, result=>{
                if (result){
                    console.log('Successfully deleted review on Movie');
                    //updateStarRating(movieID);
                    db.findMany(Ratings, {movieID: movieID}, '', function(r){
                        if (r){
                            var total = 0;
                            for (let i=0; i<r.length; i++){
                                total = total + r[i].starRating;
                            }
                            
                            if(r.length>=1)
                                total = (total/r.length).toFixed(1);
                
                            db.updateOne(Movies,{_id: movieID},{
                                aveScore: total
                            }, result=>{
                                if (result)
                                    console.log("Successfully changed starRating of Movie");
                                else console.log("Error updating starRating of Movie");
                                return res.redirect('/movies/view/' + movieID);                             
                            });
                        }
                        else console.log("Error finding ratings of Movie");  
                    })
                }
                else
                    console.log('Error deleting review on Movie');
            });
        });
    },
    
    editReview: (req, res, next)=>{
        var rate = req.body.rating;
        var reviewTitle = req.body.ReviewTitle;
        var review = req.body.Review;
        var movieID = req.body.movieTitle;
        var userID = '';

        db.findOne(Users, {username: req.session.userId}, '', function(user){
            userID = user._id;
        })
        
        db.findOne(Movies, {_id: movieID},'',function(movie){
            if (movie){
                //console.log("movie found!");
                var d = new Date();
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var date = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
                // console.log(date.toString());

                let updatedReview = {
                    userID: userID,
                    movieID: movie._id,
                    date: date,
                    starRating: rate,
                    commentTitle: reviewTitle,
                    comment: review,
                }

                db.updateOne(Ratings, {userID: userID,
                    movieID: movie._id,} , updatedReview, result=>{
                    if (result){
                        console.log("Successfully edited document in Ratings collection.");
                        //updateStarRating(movie._id);
                        db.findMany(Ratings, {movieID: movie._id}, '', function(r){
                            if (r){
                                var total = 0;
                                for (let i=0; i<r.length; i++){
                                    total = total + r[i].starRating;
                                }
                                
                                total = (total/r.length).toFixed(1);
                    
                                db.updateOne(Movies,{_id: movie._id},{
                                    aveScore: total
                                }, result=>{
                                    if (result)
                                        console.log("Successfully changed starRating of Movie");
                                    else console.log("Error updating starRating of Movie");
                                });
                            }
                            else console.log("Error modifying ratings of Movie");  
                        });

                        return res.redirect('/movies/view/' + movieID);
                    }
                    else console.log("Error modifying Ratings collection");
                });
            }
            else{
                //console.log(req.body.movieTitle);
                console.log('Movie not found!');    
            }
        })
    }
};

function quick_Sort(movie) {
    if (movie.length <= 1) { 
        return movie;
    } else {

        var left = [];
        var right = [];
        var newArray = [];
        var pivot = movie.pop();
        var length = movie.length;

        for (var i = 0; i < length; i++) {
            let r = movie[i].title.localeCompare(pivot.title);
            if (r == 0 || r == -1) {
                left.push(movie[i]);
            } else {
                right.push(movie[i]);
            }
        }

        return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
    }
}

module.exports = moviesController;
