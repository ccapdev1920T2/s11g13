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
            // isSignedIn: true,
        })
    },

    getRegister: function(req, res, next){
        res.render("register", {
            pageName: "Register",
            
        })
    },

    getLogin: function(req, res, next){
        res.render("login", {
            pageName: "Log In",
            
        })
    },

    getAsdf: function(req, res, next) {
        res.send('Asdf Directory');
    },

    getSeats: function(req, res, next) {
    	res.render('seats', {
    	  header: 'seats'
    	})
    },

    getUserProfile: function(req, res, next) {
    	res.render('userprofile', {
    	  fname: req.params.fname,
    	  lname: req.params.lname,
    	  username: req.params.username,
    	  email: req.params.email,
    	  mobileNum: req.params.mobileNum,
    	  pic: '../../../../../../../assets/profpic.png'
    	})
    }
};

module.exports = indexFunctions;