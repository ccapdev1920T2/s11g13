const indexController = {
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
};

module.exports = indexController;
