//Insert db model dependencies here
const db = require('../models/database.js');
const mongoose = require('mongoose');
const Users = require('../models/UsersModel.js');
const Tickets = require('../models/TicketsModel.js');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Seats = require('../models/SeatsModel.js');
const Ratings = require('../models/RatingsModel.js');
const multer = require('multer');


//Insert other module dependencies here

//Functions for userController
const userController = {
    getUserProfile: function(req, res, next) {
        let retrievedData = {};
        let un = req.params.username;
        db.findOne(Users, {username: un}, '', function(user){
            retrievedData = {
                pageName: "User Profile",
                pic: user.pic,
                fname: user.firstName,
                lname: user.lastName,
                username: user.username,
                email: user.email,
                phone: user.mobileNumber,
            }
            res.render('userprofile', retrievedData);
        })
    },
    
    getUserTicket: function(req, res, next) {
        createdTicketID = new mongoose.Types.ObjectId();
        db.findOne(Users,{username: req.session.userId},'_id pic', function(u){ //userID
            Tickets.find({userID: u._id}).populate('userID').populate({
                    path : 'showID', 
                    populate : {
                        path : 'movieID' }}).exec().then(t=>{ //ticket filtered by userID
                ticketArray = [];
                for (var i=0;i<t.length;i++)
                {
                    var d = new Date(t[i].showID.date); //ISODate
                    year = d.getFullYear(); //year of ISODate
                    month = d.getMonth()+1 //month of ISODate
                    dt = d.getDate(); //day of ISOdate
                    if (dt < 10) { //get number of days
                        dt = '0' + dt;
                    }
                    if (month < 10) { //get number of months
                        month = '0' + month;
                    }
                    formattedDate = month + '-' + dt + '-' + year; //formatted date mm-dd-yyyy

                    ticketObj = {
                        status: t[i].status,
                        title: t[i].showID.movieID.title,
                        showDate: formattedDate,
                        showTime: t[i].showID.time,
                        seats: t[i].seats,
                        totalCost: t[i].totalPrice,
                        dateBooked: "04-09-2020",
                    }
                        ticketArray.push(ticketObj);
                }

                res.render('ticket', {
                    pageName: "View Tickets",
                    // isSignedIn: true,
                    pic: u.pic,
                    username: req.session.userId,
                    fname: u.fName,
                    lname: u.lName,
                    tickets: ticketArray,
                })
            }).catch(err=>{
                return res.redirect('/');
            })
        })
    },

    editProfile: function(req, res, next) {
        //multer storage
        const storage = multer.diskStorage({
          destination: '/assets/ProfilePictures/',
          filename: function(req, file, cb) {
            cb(null,file.fieldname);
          }
        });

        const upload = multer({
            storage: storage
        }).single('File');

        upload(req, res, (err) => {
            if (!err){  
                //console.log(req.file.destination);
                    
                db.updateOne(Users,{username: req.body.UName},{
                    firstName: req.body.fName,
                    lastName: req.body.lName,
                    mobileNumber: req.body.Mobile,
                    email: req.body.Email,
                    pic: req.file.destination + req.file.originalname,
                },profile=>{});
                //display
                res.redirect("/user/"+req.body.username);
            }
        })

    },
}

module.exports = userController;