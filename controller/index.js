const indexFunctions = {
    getHome: function(req, res, next) {
        res.render("home", {
            pageName: "Home",
            current: "Home",
            movies: [
                {title: "P.S. I Still Love You", imageurl: "assets/MoviePosters/psIStillLoveYou.jpg"},
                {title:"The Conjuring", imageurl: "assets/MoviePosters/TheConjuring.jpg"},
                {title: "The Lightning Thief", imageurl: "assets/MoviePosters/PercyJacksonTheLightningThief.jpg"},
                {title: "It", imageurl: "assets/MoviePosters/it.jpg"},
                {title: "Taken", imageurl: "assets/MoviePosters/Taken.jpg"},
                {title: "Avengers: Civil War", imageurl: "assets/carousel/AvengersCivilWar.png"},
                {title: "Captain America: The Winter Soldier", imageurl: "assets/carousel/CaptainAmericaTheWinterSoldier.jpeg"},
                {title: "Doctor Who - The Day of the Doctor", imageurl: "assets/carousel/DoctorWhoTheDayOfTheDoctor.jpg"},
            ],
        })
    },

    getMovies: function(req, res, next) {
        res.render("movies", {
            pageName: "Movies",
            current: "Movies",
            movies: [
                {title: "P.S. I Still Love You", imageurl: "/assets/MoviePosters/psIStillLoveYou.jpg"},
                {title:"The Conjuring", imageurl: "/assets/MoviePosters/TheConjuring.jpg"},
                {title: "The Lightning Thief", imageurl: "/assets/MoviePosters/PercyJacksonTheLightningThief.jpg"},
                {title: "It", imageurl: "/assets/MoviePosters/it.jpg"},
                {title: "Taken", imageurl: "/assets/MoviePosters/Taken.jpg"},
                {title: "Avengers: Civil War", imageurl: "/assets/carousel/AvengersCivilWar.png"},
                {title: "Captain America: The Winter Soldier", imageurl: "/assets/carousel/CaptainAmericaTheWinterSoldier.jpeg"},
                {title: "Doctor Who - The Day of the Doctor", imageurl: "/assets/carousel/DoctorWhoTheDayOfTheDoctor.jpg"},
            ],
        })
    }, 

    getCalendar: function(req, res, next) {
        res.render("calendar", {
            pageName: "Calendar",
            current: "Calendar",
            moviePicM: ["assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg"],
            moviePicT: ["assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg"],
            moviePicW: ["assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg"],
            moviePicH: ["assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg"],
            moviePicF: ["assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg"],
            moviePicSa: ["assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg"],
            moviePicSu: ["assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg",
            "assets/MoviePosters/it.jpg","assets/MoviePosters/TheConjuring.jpg","assets/MoviePosters/Taken.jpg"]
            
            // isSignedIn: true,
        })
    },

    getRegister: function(req, res, next){
        res.render("register", {
            pageName: "Register",
        })
    },

    postRegister: (req, res, next)=>{
        let {
            regFName,
            regLName,
            regUName,
            regEmail,
            regPhone,
        } = req.body;
        
        let retrievedData = {
            pageName: "User Profile",
            isSignedIn: true,
            fname: regFName,
            lname: regLName,
            username: regUName,
            email: regEmail,
            phone: regPhone,
        };

        console.log(retrievedData);
        res.render("userprofile", retrievedData);
    },

    //Render login page
    getLogin: function(req, res, next){
        res.render("login", {
            pageName: "Log In",
            
        })
    },

    postLogin: (req, res, next)=>{
        let {
            username,
        } = req.body;

        let retrievedData = {};

        if(username=="jhcagaoan"){
            retrievedData = {
                pageName: "User Profile",
                isSignedIn: true,
                pic: "url('/assets/profpic.png')",
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

        res.render("userprofile", retrievedData);
    },

    getSeats: (req, res, next)=>{
        res.render("seats", {
            pageName: "Reserve Seats",
            seatRow: [
                [{seatName: "1A", isTaken: true}, {seatName: "1B", isTaken: false}, {seatName: "1C", isTaken: false}, {seatName: "1D", isTaken: false},
                {seatName: "1E", isTaken: false},{seatName: "1F", isTaken: false},{seatName: "1G", isTaken: false},{seatName: "1H", isTaken: false}],
                [{seatName: "2A", isTaken: true},{seatName: "2B", isTaken: false},{seatName: "2C", isTaken: false},{seatName: "2D", isTaken: false},
                {seatName: "2E", isTaken: false},{seatName: "2F", isTaken: true},{seatName: "2G", isTaken: true},{seatName: "2H", isTaken: false}],
                [{seatName: "3A", isTaken: true},{seatName: "3B", isTaken: false},{seatName: "3C", isTaken: false},{seatName: "3D", isTaken: false},
                {seatName: "3E", isTaken: false},{seatName: "3F", isTaken: false},{seatName: "3G", isTaken: false},{seatName: "3H", isTaken: false}],
                [{seatName: "4A", isTaken: true},{seatName: "4B", isTaken: false},{seatName: "4C", isTaken: false},{seatName: "4D", isTaken: true},
                {seatName: "4E", isTaken: false},{seatName: "4F", isTaken: false},{seatName: "4G", isTaken: false},{seatName: "4H", isTaken: false}]
            ]
        })
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

        let movies = [
            {title: "April 2, 2020", imageurl: "/assets/MoviePosters/psIStillLoveYou.jpg"},
            {title: "April 3, 2020", imageurl: "/assets/MoviePosters/psIStillLoveYou.jpg"},
            {title: "April 4, 2020", imageurl: "/assets/MoviePosters/psIStillLoveYou.jpg"},
            {title: "April 5, 2020", imageurl: "/assets/MoviePosters/psIStillLoveYou.jpg"},
            {title: "April 6, 2020", imageurl: "/assets/MoviePosters/psIStillLoveYou.jpg"},
        ];

        //sample data retrieved from db
        if (req.params.movieID == "00023"){
            movieDetails = {
                title: "To All The Boys P.S. I Love You",
                genre: "Romance",
                moviecover: "/assets/MoviePosters/psIStillLoveYou.jpg",
                rating: 4.6,
                synopsis: "Lara Jean is officially Peter’s girlfriend, so everything should be perfect, right? But feelings grow complicated when an old crush reenters her life.",
                cast: ["Lana Condor", "Noah Centineo", "Jordan Fisher"],
            }

            review = [
                {fName: "John Henry", lName: "Cagaoan", profilepic: "/assets/profpic.png", date: "February 14, 2020",
                rating: 5, commentTitle: "Would watch again", comment: "Solid! Made me cry",},
                
                {fName: "Bianca", lName: "Ganda", profilepic: "/assets/profpic.png", date: "February 20, 2020",
                rating: 5, commentTitle: "Kiligss", comment: "Ang cute :(( Choosing Peter was the right choice!",},
                
                {fName: "Arren", lName: "Antioquia", profilepic: "/assets/profpic.png", date: "February 24, 2020",
                rating: 5, commentTitle: "Nice Movie", comment: "I'll recommend this to my students in CCAPDEV.",},
                
                {fName: "Howard", lName: "Montecillo", profilepic: "/assets/profpic.png", date: "February 29, 2020",
                rating: 5, commentTitle: "Good", comment: "Recommended by my prof. It was worth it.",},

                {fName: "Sean", lName: "Potato", profilepic: "/assets/profpic.png", date: "February 29, 2020",
                rating: 5, commentTitle: "Super Good", comment: "Haven't watched romance in a while. Definitely a good movie to watch.",},

                {fName: "Chuan-chen", lName: "Chu", profilepic: "/assets/profpic.png", date: "March 22, 2020",
                rating: 3, commentTitle: "What", comment: "Maling movie ata napanood ko",},
            ]
        }

        res.render("movie-view", {
            pageName: movieDetails.title,
            movieDetails,
            review,
            movies,
        });
    },


    getAsdf: function(req, res, next) {
        res.send('Asdf Directory');
    },

    getUserProfile: function(req, res, next) {
    	res.render('userprofile', {
            pageName: "User Profile",
            isSignedIn: true,
            username: req.params.username
    	})
    },

    getUserTicket: function(req, res, next) {
        res.render('ticket', {
            pageName: "View ticket",
            username: req.params.username,
            tickets: [{title: "title1",showDate: "showDate1",showTime: "showTime1",dateBooked: "dateBooked1",seatNum: "seatNum1",price: "price1"},
            {title: "title2",showDate: "showDate2",showTime: "showTime2",dateBooked: "dateBooked2",seatNum: "seatNum2",price: "price2"},
            {title: "title3",showDate: "showDate3",showTime: "showTime3",dateBooked: "dateBooked3",seatNum: "seatNum3",price: "price3"},
            {title: "title4",showDate: "showDate4",showTime: "showTime4",dateBooked: "dateBooked4",seatNum: "seatNum4",price: "price4"}]
        })
    },

    getCart: function(req, res, next) {
        res.render('cart', {
            pageName: "View Cart",
            pic: '/assets/profpic.png',
            fname: 'Bianca Joy',
            lname: 'Benedictos',
            username: '@' + 'biancarb',
            tickets: [{title: "title1",showDate: "showDate1",showTime: "showTime1", seatNum: "seatNum1",price: "price1"},
            {title: "title2",showDate: "showDate2",showTime: "showTime2",seatNum: "seatNum2",price: "price2"},
            {title: "title3",showDate: "showDate3",showTime: "showTime3",seatNum: "seatNum3",price: "price3"},
            {title: "title4",showDate: "showDate4",showTime: "showTime4",seatNum: "seatNum4",price: "price4"}]
        })
    },
};

module.exports = indexFunctions;