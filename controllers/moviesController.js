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
                            //example
                            rev1 =
                            {
                                fName: "John Henry",
                                lName: "Cagaoan",
                                username: "jhcagaoan", 
                                profilepic: "/assets/MoviePosters/profpic.png", 
                                date: "February 14, 2020",
                                rating: 5, 
                                commentTitle: "Would watch again", 
                                comment: "Solid! Made me cry",
                            }
                            review.push(rev1);
                            rev2 = {
                                fName: "Bianca", 
                                lName: "Ganda", 
                                username: "biancarb", 
                                profilepic: "/assets/MoviePosters/profpic.png", 
                                date: "February 20, 2020",
                                rating: 5, 
                                commentTitle: "Kiligss", 
                                comment: "Ang cute :(( Choosing Peter was the right choice!",
                            }
                            review.push(rev2);
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
        rate = req.body.rating;
        reviewTitle = req.body.ReviewTitle;
        review = req.body.Review;

        db.findOne(Movies, {title: req.params.title}, '', function(movie){
            if (movie){
                db.insertOne(Ratings,{
                userID: req.session.userId,
                movieID: movie._id,
                date: '01-01-0000',
                starRating: rate,
                commentTitle: reviewTitle,
                comment: review,
                })
            }
            else{
                console.log(req.params.title);
                
            }
        })

        res.render('/movies/view/' + req.params.title)
    },
};



module.exports = moviesController;
