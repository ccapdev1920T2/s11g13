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
                username,
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
                ["1A","1B","1C","1D","1E","1F","1G","1H"],
                ["2A","2B","2C","2D","2E","2F","2G","2H"],
                ["3A","3B","3C","3D","3E","3F","3G","3H"],
                ["4A","4B","4C","4D","4E","4F","4G","4H"]
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
        let ratings = {};

        //sample data retrieved from db
        if (req.params.movieID == "00023"){
            movieDetails = {
                title: "To All The Boys P.S. I Love You",
                genre: "Romance",
                moviecover: "/assets/MoviePosters/psIStillLoveYou.jpg",
                rating: 4.4,
                synopsis: "Lara Jean is officially Peter’s girlfriend, so everything should be perfect, right? But feelings grow complicated when an old crush reenters her life.",
                cast: ["Lana Condor", "Noah Centineo", "Jordan Fisher"],
            }

            review = {
                fName: "John Henry",
                lName: "Cagaoan",
                profilepic: "/assets/profpic.png",
                date: "February 14, 2020",
                rating: 5,
                commentTitle: "Would watch again",
                comment: "Solid! Made me cry",
            }
        }

        res.render("movie-view", {
            pageName: movieDetails.title,
            movieDetails,
            review,
        
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
    }
};

module.exports = indexFunctions;