//Insert db model dependencies here
const mongoose = require('mongoose');
const User = require('../models/UsersModel.js');

//Functions for userController
const userController = {
    getUserProfile: function(req, res, next) {
        let retrievedData = {};
        let un = req.params.username;
        User.find({username: un})
            .then(user=>{
                retrievedData = {
                    pageName: "User Profile",
                    pic: user[0].pic,
                    fname: user[0].firstName,
                    lname: user[0].lastName,
                    username: user[0].username,
                    email: user[0].email,
                    phone: user[0].mobileNumber,
                }
                res.render('userprofile', retrievedData);
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