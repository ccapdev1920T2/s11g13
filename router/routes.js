const express = require('express');
const router = express();

// controllers that provide functions depending on post or get
const controller = require('../controllers/indexController');
const logController = require("../controllers/loginController");
const regController = require("../controllers/registerController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const adminAddMovie = require("../controllers/addMovie.js");
const adminAddShow = require("../controllers/addShow.js");
// const checkAuth = require('../middleware/check-auth');
// const redirectLogin = require('../middleware/redirectLogin');

const mongoose = require('mongoose');
const User = require('../models/UsersModel.js');

/* proper showId */
const showId = (req, res, next) =>{
    //findone with showId
}

const activeSession = (req, res, next) =>{
    console.log('active session function');
    if (req.session.userId){
        return res.redirect('user/'+ res.locals.user)
    }else{
        return next();
    }
}

const rightUserLogged = (req, res, next) =>{
    console.log('comparing strings')
    if (req.params.username.equal(req.session.userId)){
        //they are equal
        return next();
    } else {
        
        console.log('activeSession')
        return activeSession;
    }
}

const adminLogged = (req, res, next) =>{
    //findout if it is a userType admin by:
    
    //find sa db using req.session.userId (token)

    //extract userType from user

}

const activeTransaction = (req, res, next) =>{

}


////// ROUTING /////////
// Handles home and '/'
router.get(["/", "/home"], controller.getHome);

//Route to see all movies
router.get("/movies", controller.getMovies);
router.get("/movies/view/:title", controller.getViewMovie);

router.get("/calendar", controller.getCalendar);
/* this path is to ''*/
router.get("/user/:username/ticket/payment", controller.getPayment);
/* this path is to '/seats' */
router.get('/:showId/seats', controller.getSeats);

/////////Routes under Register Account
router.get("/register", activeSession,regController.getRegister);
router.post("/register", regController.postRegister);

/////////Routes under Login////////
router.get("/login", activeSession, logController.getLogin);
router.post("/login", logController.postLogin);

///////Routes Involving user/////////
/* this path is to '/userprofile/:username' */
router.get('/user/:username', rightUserLogged, userController.getUserProfile);
/* this path is to '/userprofile/:username/ticket' */
router.get('/user/:username/tickets', rightUserLogged, userController.getUserTicket);
/* this path is to '/userprofile/:username/cart' */
router.get('/user/:username/cart', userController.getCart);


/* this path is to '/admin' */
router.get('/admin', rightUserLogged, adminLogged, adminController.getAdminBoard);
/* add show and add movie */
router.post('/admin/addShow', adminAddShow.postShow);
router.post('/admin/addMovie', adminAddMovie.postMovie);


module.exports = router;