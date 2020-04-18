const db = require('../models/database.js');
const mongoose = require('mongoose');
const Seats = require('../models/SeatsModel.js');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Users = require('../models/UsersModel.js');
const Ratings = require('../models/RatingsModel.js');
const Tickets = require('../models/TicketsModel.js');

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

        
            Shows.find().select("dayOfWeek movieID date").populate('movieID').exec().then(s=>{
                let movieArraySu = []; //1
                let movieArrayM  = []; //2
                let movieArrayT  = []; //3
                let movieArrayW  = []; //4
                let movieArrayH  = []; //5
                let movieArrayF  = []; //6
                let movieArraySa = []; //7
                for (let i=0;i<s.length;i++)
                {
                    if (s[i].date >= new Date(Date.now()) && s[i].date <= new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)) //if date is date.now or 6 days later
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
                })
        
        function sleep (time) {
          return new Promise((resolve) => setTimeout(resolve, time));
        }

        sleep(500).then(() => {
            res.render("seats", {
            pageName: "Reserve Seats",
            seatRow: seatRow,
            showID: req.body.showID,
        })
        });


    },

    getPayment: function(req, res, next){

        Shows.findOne({_id: req.body.showID}).populate('movieID').exec().then(s=>{
            var seatsArray = [];
            for (var i=1;i<=4;i++)
            {
                for (var j=0;j<8;j++)
                {
                    if (j==0)
                        letter = 'A';
                    else if (j==1)
                        letter = 'B';
                    else if (j==2)
                        letter = 'C';
                    else if (j==3)
                        letter = 'D';
                    else if (j==4)
                        letter = 'E';
                    else if (j==5)
                        letter = 'F';
                    else if (j==6)
                        letter = 'G';
                    else if (j==7)
                        letter = 'H';
                    if (req.body['checkBox'+i+letter])
                        seatsArray.push(i+letter);
                }
            }

            var d = new Date(s.date); //ISODate
            year = d.getFullYear(); //year of ISODate
            month = d.getMonth()+1 //month of ISODate
            dt = d.getDate(); //day of ISOdate
            if (dt < 10) { //get number of days
              dt = '0' + dt;
            }
            if (month < 10) { //get number of months
              month = '0' + month;
            }
            formattedDate = month + '/' + dt + '/' + year; //formatted date mm/dd/yyyy

            res.render("payment", {
                pageName: "Payment Gateway",
                isSignedIn: true,
                ticketDetails: {
                    showID: s._id,
                    title: s.movieID.title,
                    showDate: formattedDate,
                    showTime: s.time,
                    seats: seatsArray,
                    totalCost: seatsArray.length * 200, //set price here
                },

            })  
        })
    },

    addTicket: (req, res, next)=>{
        Users.find({token:req.session.userId}).exec().then(user=>{
            createdTicketID = new mongoose.Types.ObjectId();
            db.findOne(Users,{username: user[0].username},'_id', function(u){
                //insert ticket into db
                db.insertOne(Tickets,{
                        _id: createdTicketID, 
                        showID:req.body.showID, 
                        userID: u._id, 
                        status: req.body.status, 
                        seats: req.body.seats, 
                        totalPrice: req.body.totalPrice
                    });
            })
            //update all selected seats to taken
            var seatArray = req.body.seats.split(',');
            for (var i=0;i<seatArray.length;i++)
            {
                db.updateOne(Seats,{"seatNum": seatArray[i], "showID": req.body.showID},{"isTaken": true});
            }

            //display
            res.render("addTicketSuccess",{
                pageName: "Ticket Reserved Successfully",
                isSignedIn: true,
            });
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
    },

    getConfirmEmail: (req, res, next)=>{
        res.render("confirmEmail", {
            pageName: "Confirm Email",
        })
    }
};



module.exports = indexController;
