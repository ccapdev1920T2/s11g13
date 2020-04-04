//Insert db model dependencies here
const db = require('../models/database.js');
const User = require('../models/UsersModel.js');

//Insert other module dependencies here
const mongoose = require('mongoose');


//Functions for userController
const userController = {
    getUserProfile: function(req, res, next) {
        let retrievedData = {};
        let username = req.params.username;
        User.findOne({username: username}, 'username firstName lastName email mobileNumber pic')
            .exec()
            .then(result=>{
                if (result){
                    result = result.toObject();
                    console.log(result)
                    retrievedData = {
                        pageName: "User Profile", 
                        isSignedIn: true,
                        fname: result.firstName,
                        lname: result.lastName,
                        uname: result.username,
                        email: result.email,
                        phone: result.mobileNumber,
                        pic: result.pic,
                    }
                    console.log(retrievedData)
                    
                    res.render('userprofile', retrievedData);
                }
                else{
                    console.log("No match found");
                    return res.status(404).redirect("/error");
                }
            })
    },

    getUserTicket: function(req, res, next) {
        let tickets = [
            {
                status: "booked", 
                title: "P.S. I Still Love You",
                showDate: "04-14-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["1A", "1B"],
                totalCost: 570.00,
                dateBooked: "04-09-2020",
            },
            {
                status: "bought", 
                title: "It",
                showDate: "04-12-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["2A"],
                totalCost: 285.00,
                dateBooked: "04-10-2020",
            },
            {
                status: "bought", 
                title: "The Lightning Thief",
                showDate: "04-13-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["1B"],
                totalCost: 240.00,
                dateBooked: "04-11-2020",
            },
            {
                status: "booked", 
                title: "Taken",
                showDate: "04-15-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["3E", "3F", "3G"],
                totalCost: 630.00,
                dateBooked: "04-12-2020",
            },
            {
                status: "booked", 
                title: "The Conjuring",
                showDate: "04-16-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["2D", "2E"],
                totalCost: 545.00,
                dateBooked: "04-10-2020",
            },
        ];

        let fname = "";
        let lname ="";
        
        let retrievedData = {};

        if(req.params.username == "biancarb"){
            fname = "Bianca Joy";
            lname = "Benedictos";
        }
        else if(req.params.username == "jhcagaoan"){
            fname = "John Henry";
            lname = "Cagaoan";
        }
        else if(req.params.username == "howardg"){
            fname = "Howard";
            lname = "Montecillo";
        }


        res.render('ticket', {
            pageName: "View Tickets",
            isSignedIn: true,
            pic: "/assets/profpic.png",
            username: req.params.username,
            fname,
            lname,
            tickets,
        })
    },

    getCart: function(req, res, next) {
        let fname = "";
        let lname = "";

        let tickets = [
            {
                status: "booked", 
                title: "P.S. I Still Love You",
                showDate: "04-14-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["1A", "1B"],
                totalCost: 570.00,
                dateBooked: "04-09-2020",
            },
            {
                status: "bought", 
                title: "It",
                showDate: "04-12-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["2A"],
                totalCost: 285.00,
                dateBooked: "04-10-2020",
            },
            {
                status: "bought", 
                title: "The Lightning Thief",
                showDate: "04-13-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["1B"],
                totalCost: 240.00,
                dateBooked: "04-11-2020",
            },
            {
                status: "booked", 
                title: "Taken",
                showDate: "04-15-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["3E", "3F", "3G"],
                totalCost: 630.00,
                dateBooked: "04-12-2020",
            },
            {
                status: "booked", 
                title: "The Conjuring",
                showDate: "04-16-2020",
                showTime: "12:45PM - 2:15PM",
                seats: ["2D", "2E"],
                totalCost: 545.00,
                dateBooked: "04-10-2020",
            },
        ];


        if(req.params.username == "biancarb"){
            fname = "Bianca Joy";
            lname = "Benedictos";
        }
        else if(req.params.username == "jhcagaoan"){
            fname = "John Henry";
            lname = "Cagaoan";
        }
        else if(req.params.username == "howardg"){
            fname = "Howard";
            lname = "Montecillo";
        }

        res.render('cart', {
            pageName: "View Cart",
            isSignedIn: true,
            pic: '/assets/profpic.png',
            fname,
            lname,
            username: req.params.username,
            tickets,
        })
    },
}

module.exports = userController;