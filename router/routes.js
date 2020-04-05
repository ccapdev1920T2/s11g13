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

/* redirect if not logged in */
const redirectLogin = (req, res, next) =>{
    console.log("userId:" + req.session.userId);
    if (!req.session.userId){
        console.log(res)
        return res.redirect('/login');
    }
    else{
        return next();
    }
}

/* redirect to user profile || admin dashboard*/
const checkUserType = (req,res,next)=>{
    
    User.find({token: req.session.userId})
        .exec()
        .then(user=>{
            if(user[0].userType.localeCompare("User")){
                //means user is an admin usertype
                return res.redirect('/admin');
            }
            else{
                return res.redirect('/user/'+user[0].username);
            };
        })
}

/* redirect if admin */
const checkAdmin = (req,res,next)=>{
    User.find({token: req.session.userId})
        .exec()
        .then(user=>{
            if(user[0].userType.localeCompare("User")){
                //means user is indeed an admin usertype
                next();
            }
            else{
                return res.redirect('/user/'+user[0].username);
            };
        })
}

/* redirect to home */
const redirectHome = (req, res, next) =>{
    console.log("userId:" + req.session.userId);
    if (req.session.userId){
        console.log(res)
        return res.redirect('/home');
    }
    else{
        return next();
    }
}

/* check if active transaction is on-going */
const checkTransaction = (req, res, next) =>{

}

/* a Session is Active */
const sessionActive = (req, res, next) =>{
    if (!req.session.userId){
        console.log(res)
        return next();
    }
    else{
        checkUserType(req,res,next);
    }
}
////// ROUTING /////////
// Handles home and '/'
router.get(["/", "/home"], controller.getHome);

//Route to see all movies
router.get("/movies", controller.getMovies);
router.get("/movies/view", controller.getViewMovie);

router.get("/calendar", controller.getCalendar);
/* this path is to ''*/
router.get("/payment", controller.getPayment);
/* this path is to '/seats' */
router.get('/seats', controller.getSeats);

/////////Routes under Register Account
router.get("/register", sessionActive, regController.getRegister);
router.post("/register", regController.postRegister);

/////////Routes under Login////////
router.get("/login", redirectHome, logController.getLogin);
router.post("/login", logController.postLogin);

///////Routes Involving user/////////
/* this path is to '/userprofile/:username' */
router.get('/user/:username', redirectLogin, checkUserType, userController.getUserProfile);
/* this path is to '/userprofile/:username/ticket' */
router.get('/user/:username/tickets', redirectLogin, checkUserType, userController.getUserTicket);
/* this path is to '/userprofile/:username/cart' */
router.get('/user/:username/cart', redirectLogin, checkUserType, userController.getCart);


/* this path is to '/admin' */
router.get('/admin', redirectLogin, checkAdmin, adminController.getAdminBoard);
/* add show and add movie */
router.post('/admin/addShow', adminAddShow.postShow);
router.post('/admin/addMovie', adminAddMovie.postMovie);


module.exports = router;