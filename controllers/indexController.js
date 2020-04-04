const db = require('../models/database.js');
const Seats = require('../models/SeatsModel.js');

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

        let seatRow = [];

        for (var i=1;i<=4;i++)
        {
            let seatCol = [];
            for (var j=0;j<8;j++)
            {
                var letter = "";
                if (j == 0)
                    letter = "A";
                else if (j == 1)
                    letter = "B";
                else if (j == 2)
                    letter = "C";
                else if (j == 3)
                    letter = "D";
                else if (j == 4)
                    letter = "E";
                else if (j == 5)
                    letter = "F";
                else if (j == 6)
                    letter = "G";
                else if (j == 7)
                    letter = "H";
                db.findOne(Seats,{seatNum: i+letter, showID: '5e88792b31600b21a8cb18a6'},'seatNum isTaken', function(seat){
                    seatObj = {
                        seatName: seat.seatNum,
                        isTaken: seat.isTaken
                    }
                seatCol.push(seatObj); //push seatobj to seatrow
                })
            }
            seatRow.push(seatCol);
        }

        
        function sleep (time) {
          return new Promise((resolve) => setTimeout(resolve, time));
        }

        sleep(800).then(() => {
            res.render("seats", {
            pageName: "Reserve Seats",
            seatRow: seatRow
        })
        });



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
        //Step 1: Check from db for matching titles

        //Step 2: Retrieve from DB
        //sample data retrieved from db
        console.log(req.query.movieID);
        if (req.query.movieID == "P.S. I Love You"){
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
        else movieDetails = {
            title: "Not found"
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
