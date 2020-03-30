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
                {fName: "John Henry", lName: "Cagaoan", username: "jhcagaoan", profilepic: "/assets/profpic.png", date: "February 14, 2020",
                rating: 5, commentTitle: "Would watch again", comment: "Solid! Made me cry",},
                
                {fName: "Bianca", lName: "Ganda", username: "biancarb", profilepic: "/assets/profpic.png", date: "February 20, 2020",
                rating: 5, commentTitle: "Kiligss", comment: "Ang cute :(( Choosing Peter was the right choice!",},
                
                {fName: "Arren", lName: "Antioquia", username: "Bh0sZxCArr3n", profilepic: "/assets/profpic.png", date: "February 24, 2020",
                rating: 5, commentTitle: "Nice Movie", comment: "I'll recommend this to my students in CCAPDEV.",},
                
                {fName: "Howard", lName: "Montecillo", username: "howardg", profilepic: "/assets/profpic.png", date: "February 29, 2020",
                rating: 5, commentTitle: "Good", comment: "Recommended by my prof. It was worth it.",},

                {fName: "Sean", lName: "Potato", username: "babalatanKoSiSarah", profilepic: "/assets/profpic.png", date: "February 29, 2020",
                rating: 5, commentTitle: "Super Good", comment: "Haven't watched romance in a while. Definitely a good movie to watch.",},

                {fName: "Chuan-chen", lName: "Chu", username: "ChuanChenChun", profilepic: "/assets/profpic.png", date: "March 22, 2020",
                rating: 3, commentTitle: "What", comment: "Maling movie ata napanood ko",},
            ]
        }

        res.render("movie-view", {
            pageName: movieDetails.title,
            movieDetails,
            review,
            movies,
            isSignedIn: true,   //sample also
            username: "jhcagaoan", //Sample only, dapat sa comment ko lang may delete button
        });
    },


    getAsdf: function(req, res, next) {
        res.send('Asdf Directory');
    },

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

    getAdminBoard: function(req, res, next) {
        /*
            VARIABLES:
            show = title, genre, rating, day, date, time
                 = list of showing movies this week
            
            FORM: New Movie
            movTitle = 
            movGenre =
            movScore =
            movSynopsis =
            movCast =

            FORM: New Show
            movieID = 
            date = 
            time = 
        */
        
        res.render('admin', {
            pageName: "Admin Dashboard",
            isSignedIn: true,
            username: "Bh0sZxCArr3n",
            movies:[
                {title: "To All The Boys P.S. I Still Love You", movie_id:23},
                {title: "The Lightning Thief", movie_id:101},
                {title: "Ice Age", movie_id:103},
                {title: "The Conjuring", movie_id: 156},
                {title: "It", movie_id: 256},
                {title: "Taken", movie_id: 269},
                {title: "Avengers: Civil War", movie_id: 298},
                {title: "Captain America: The Winter Soldier", movie_id: 302},
                {title: "Doctor Who - The Day of the Doctor", movie_id: 307},
            ],
            show: [
                {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                {title: 'MovieMysteryAdventure', genre: 'Mystery, Adventure', rating: '3', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                {title: 'MovieMysteryAdventure', genre: 'Mystery, Adventure', rating: '3', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 4, date: '04-15-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 5, date: '04-16-20', time: '12:45 - 14:15'},
                {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 6, date: '04-17-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 6, date: '04-17-20', time: '12:45 - 14:15'},
                {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 7, date: '04-18-20', time: '12:45 - 14:15'},
                {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 7, date: '04-18-20', time: '12:45 - 14:15'},
            ],
        })
    },
};

module.exports = indexFunctions;
