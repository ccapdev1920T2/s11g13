const db = require('../models/database.js');
const Seats = require('../models/SeatsModel.js');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Users = require('../models/UsersModel.js');
const Ratings = require('../models/RatingsModel.js');

const indexController = {
    getHome: function(req, res, next) {

        db.findMany(Movies,{},'title posterUrl', function(movie){
            let movieArray = [];
            for (let i=0;i<movie.length;i++)
            {
                movieObj = 
                    {
                        title: movie[i].title,
                        imageurl: movie[i].posterUrl
                    }
                movieArray.push(movieObj);
            }

            res.render("home", {
                pageName: "Home",
                current: "Home",
                movies: movieArray,
            })
        })

    },

    getMovies: function(req, res, next) {

        db.findMany(Movies,{},'title posterUrl', function(movie){
            let movieArray = [];
            for (let i=0;i<movie.length;i++)
            {
                movieObj = 
                    {
                        title: movie[i].title,
                        imageurl: movie[i].posterUrl
                    }
                movieArray.push(movieObj);
            }
            
            res.render("movies", {
            pageName: "Movies",
            current: "Movies",
            movies: movieArray,
            })
        })

    }, 

    

    getCalendar: function(req, res, next) {

        db.findMany(Movies,{},'posterUrl',function(movie){
            Shows.find().select("dayOfWeek movieID").populate('movieID').exec().then(s=>{
                let movieArraySu = []; //1
                let movieArrayM  = []; //2
                let movieArrayT  = []; //3
                let movieArrayW  = []; //4
                let movieArrayH  = []; //5
                let movieArrayF  = []; //6
                let movieArraySa = []; //7
                for (let i=0;i<s.length;i++)
                {
                    movieObj = {
                        movieUrl : s[i].movieID.posterUrl,
                        title: s[i].movieID.title,
                    }
                    //push posterUrl to the array
                    if (s[i].dayOfWeek == 1)
                    {
                        movieArraySu.push(movieObj); //Sunday
                    }
                    else if (s[i].dayOfWeek == 2)
                    {
                        movieArrayM.push(movieObj); //Monday
                    }
                    else if (s[i].dayOfWeek == 3)
                    {
                        movieArrayT.push(movieObj); //Tuesday
                    }
                    else if (s[i].dayOfWeek == 4)
                    {
                        movieArrayW.push(movieObj); //Wednesday
                    }
                    else if (s[i].dayOfWeek == 5)
                    {
                        movieArrayH.push(movieObj); //Thursday
                    }
                    else if (s[i].dayOfWeek == 6)
                    {
                        movieArrayF.push(movieObj); //Friday
                    }
                    else if (s[i].dayOfWeek == 7)
                    {
                        movieArraySa.push(movieObj); //Saturday
                    }
                }
                res.render("calendar", {
                    pageName: "Calendar",
                    current: "Calendar",
                    moviePicSu: movieArraySu,
                    moviePicM: movieArrayM,
                    moviePicT: movieArrayT,
                    moviePicW: movieArrayW,
                    moviePicH: movieArrayH,
                    moviePicF: movieArrayF,
                    moviePicSa: movieArraySa,
                })
            })
        })

    },

    getSeats: (req, res, next)=>{

        let seatRow = [];

        for (var i=1;i<=4;i++)
        {
            let seatCol = [];
            for (var j=0;j<8;j++)
            {
                var letter = "";
                if (j == 0)
                    letter = "A";
                else if (j == 1)
                    letter = "B";
                else if (j == 2)
                    letter = "C";
                else if (j == 3)
                    letter = "D";
                else if (j == 4)
                    letter = "E";
                else if (j == 5)
                    letter = "F";
                else if (j == 6)
                    letter = "G";
                else if (j == 7)
                    letter = "H";
                db.findOne(Seats,{seatNum: i+letter, showID: req.params.showID},'seatNum isTaken', function(seat){
                    seatObj = {
                        seatName: seat.seatNum,
                        isTaken: seat.isTaken
                    }
                seatCol.push(seatObj); //push seatobj to seatrow
                })
            }
            seatRow.push(seatCol);
        }

        
        function sleep (time) {
          return new Promise((resolve) => setTimeout(resolve, time));
        }

        sleep(800).then(() => {
            res.render("seats", {
            pageName: "Reserve Seats",
            seatRow: seatRow
        })
        });


    },

    getPayment: function(req, res, next){
        res.render("payment", {
            pageName: "Payment Gateway",
            isSignedIn: true,
            ticketDetails: {
                title: "P.S. I Still Love You",
                showDate: "04-14-2000",
                showTime: "12:45PM - 2:15PM",
                seats: ["1A", "1B"],
                totalCost: 570.00,
            },

            
        })
    },

    getViewMovie: (req, res, next)=>{
        let movieDetails = {};
        let review;

        db.findOne(Movies,{title: req.params.title},'',function(movie){
            Shows.find({movieID: movie._id}).populate('movieID').exec().then(s=>{
                let show = [];
                for (let i=0;i<s.length;i++)
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

                            res.render("movie-view", {
                                pageName: movieDetails.title,
                                movieDetails: movieDetails,
                                review: review,
                                movies: show,
                                isSignedIn: true,   //sample also
                                username: "jhcagaoan", //Sample only, dapat sa comment ko lang may delete button
                            });


                    })
                })
            })
        })
    }
};



module.exports = indexController;
