//Insert db model dependencies here



//Functions for userController
const userController = {
    getUserProfile: function(req, res, next) {
        let retrievedData = {};
        let username = req.params.username;

        if(username=="jhcagaoan"){
            retrievedData = {
                pageName: "User Profile",
                isSignedIn: true,
                pic: "/assets/profpic.png",
                fname: "John Henry",
                lname: "Cagaoan",
                username,
                email: "john_henry_cagaoan@dlsu.edu.ph",
                phone: "09273667542",
            }
            // next("/userprofile/" + username, retrievedData);
        }
        else if(username=="biancarb"){
            retrievedData = {
                pageName: "User Profile",
                isSignedIn: true,
                pic: "/assets/profpic.png",
                fname: "Bianca Joy",
                lname: "Benedictos",
                username,
                email: "bianca_benedictos@dlsu.edu.ph",
                phone: "09123456789",
            }
            // next("/userprofile/" + username, retrievedData);
        }
        else if(username=="howardg"){
            retrievedData = {
                pageName: "User Profile",
                isSignedIn: true,
                pic: "/assets/profpic.png",
                fname: "Howard",
                lname: "Montecillo",
                username: "howardg",
                email: "howard_montecillo@dlsu.edu.ph",
                phone: "09876543210",
            }
            // next("/userprofile/" + username, retrievedData);
        }
        
        res.render('userprofile', retrievedData);
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