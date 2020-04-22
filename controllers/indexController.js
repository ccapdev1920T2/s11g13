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
        
            res.render("home", {
                pageName: "Home",
                current: "Home",
                movies: movieArray,
                username: un,
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

            let un;
            un = (req.session.userId)? req.session.userId: '';
            
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
                username: un
            })
            
        })
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
            
            let un;
            un = (req.session.userId)? req.session.userId: '';

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
                username: un,
            })
        })
    },

    addTicket: (req, res, next)=>{
        createdTicketID = new mongoose.Types.ObjectId();
        db.findOne(Users,{username:req.userId},'_id', function(u){
            //insert ticket into db
            db.insertOne(Tickets,{
                    _id: createdTicketID, 
                    showID:req.body.showID, 
                    userID: u._id, 
                    status: req.body.status, 
                    seats: req.body.seats, 
                    totalPrice: req.body.totalPrice
                }, result=>{
                    if (result) console.log("Successfully inserted document to Tickets collection");
                    else console.log("Error inserting to Tickets collection");
                    
                });
        })
        //update all selected seats to taken
        var seatArray = req.body.seats.split(',');
        for (var i=0;i<seatArray.length;i++)
        {
            db.updateOne(Seats,{"seatNum": seatArray[i], "showID": req.body.showID},{"isTaken": true});
        }

        let un;
        un = (req.session.userId)? req.session.userId: '';
        //display
        res.render("addTicketSuccess",{
            pageName: "Ticket Reserved Successfully",
            // isSignedIn: true,
            username: un,
        });
    },
    
    getConfirmEmail: (req, res, next)=>{
        db.findOne(Users, {username: req.session.userId}, '', function(user){
            res.render("confirmEmail", {
                pageName: "Confirm Email",
                username: user.username
            })
        })
    }
};



module.exports = indexController;
