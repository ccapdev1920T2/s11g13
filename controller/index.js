const indexFunctions = {
    getHome: function(req, res, next) {
        res.render("home", {
            pageName: "Home",
            current: "Home",
        })
    },

    getMovies: function(req, res, next) {
        res.render("movies", {
            pageName: "Movies",
            current: "Movies",
        })
    }, 

    getCalendar: function(req, res, next) {
        res.render("calendar", {
            pageName: "Calendar",
            current: "Calendar",
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