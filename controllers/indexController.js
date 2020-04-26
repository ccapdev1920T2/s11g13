const db = require('../models/database.js');
const mongoose = require('mongoose');
const Seats = require('../models/SeatsModel.js');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Users = require('../models/UsersModel.js');
const Ratings = require('../models/RatingsModel.js');
const Tickets = require('../models/TicketsModel.js');
const CCInfos = require('../models/CCInfosModel.js');

const indexController = {
    getHome: function(req, res, next) {
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
                var now = new Date(Date.now());
                    now.setHours(0,0,0,0); //set time of date.now to all 0 to match with database
                var sixDaysLater = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000);
                    sixDaysLater.setHours(0,0,0,0);
                if (s[i].date >= now && s[i].date <= sixDaysLater) //if date is date.now or 6 days later
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
            
            movieArraySu = quick_Sort(movieArraySu); //1
            movieArrayM  = quick_Sort(movieArrayM); //2
            movieArrayT  = quick_Sort(movieArrayT); //3
            movieArrayW  = quick_Sort(movieArrayW); //4
            movieArrayH  = quick_Sort(movieArrayH); //5
            movieArrayF  = quick_Sort(movieArrayF); //6
            movieArraySa = quick_Sort(movieArraySa); //7
            
            movID=1;
            if(s.length > 0)
                movID = s[0].movieID._id;

            res.render("calendar", {
                pageName: "Calendar",
                current: "Calendar",
                movieID: movID,
                moviePicSu: movieArraySu,
                moviePicM: movieArrayM,
                moviePicT: movieArrayT,
                moviePicW: movieArrayW,
                moviePicH: movieArrayH,
                moviePicF: movieArrayF,
                moviePicSa: movieArraySa,
                username: un
            })
            
        }).catch(err=>{
            return res.redirect('/');
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
        }).catch(err=>{
            return res.redirect('/');
        })
    },

    addTicket: (req, res, next)=>{
        createdTicketID = new mongoose.Types.ObjectId();
        db.findOne(Users,{username:req.session.userId},'_id email', function(u){
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
            //Add credit card to db
            // if (req.body.payCard){
                //Form date first
                let month = req.body.expiryMonth;
                let year = req.body.expiryYear;
                let day;
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                    day = "31"
                else if (month == 9 || month == 4 || month == 6 || month == 11)
                    day = "30";
                else if (month == 2){
                    if (year%4 == 0 && year%100 != 0)
                        day = "29";
                    else day = "28";
                }
                let expdate = year + "-" + month + "-" + day;
                let creditCard = new CCInfos({
                    email: u.email,
                    ccnumber: req.body.cardNum,
                    ccexpdate: expdate
                });

                db.insertOne(CCInfos, creditCard, result=>{
                    if (result)
                        console.log("Successfully inserted ccinfo")
                    else console.log("Error in inserting to ccinfo")
                })
            // }
        })
        //update all selected seats to taken
        var seatArray = req.body.seats.split(',');
        for (var i=0;i<seatArray.length;i++)
        {
            db.updateOne(Seats,{"seatNum": seatArray[i], "showID": req.body.showID},{"isTaken": true},seat=>{});
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
    /*
    getConfirmEmail: (req, res, username, next)=>{
        db.findOne(Users, {username: req.session.userId}, '', function(user){
            res.render("confirmEmail", {
                pageName: "Confirm Email",
                username: user.username
            })
        })
    }
    */
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

module.exports = indexController;
