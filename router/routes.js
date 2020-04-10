const express = require('express');
const router = express();

// controllers that provide functions depending on post or get
const controller = require('../controllers/indexController');
const logController = require("../controllers/loginController");
const regController = require("../controllers/registerController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
//const adminAddMovie = require("../controllers/addMovie.js");
//const adminAddShow = require("../controllers/addShow.js");
const mongoose = require('mongoose');
const User = require('../models/UsersModel.js');

const rlActiveSession = (req, res, next) =>{
    if (req.session.userId){
        User.find({token: req.session.userId})
            .then(user=>{
                console.log('userfound');
                return res.redirect('user/'+ user[0].username);
            })
    }else{
        return next();
    }
}

const validUser = (req, res, next) =>{
    if (req.session.userId){
        User.find({token: req.session.userId})
            .then(user=>{
                if (user[0].username == req.params.username){
                    if (user[0].userType == "User"){
                        return next();
                    } else {
                        res.redirect('/admin');
                    }
                } else {
                    return res.redirect('/user/'+ user[0].username);
                }
            })
    }else{
        return res.redirect('/login');
    }
}

const validAdmin = (req, res, next) =>{
    if (req.session.userId){
        User.find({token: req.session.userId})
            .then(user=>{
                if (user[0].userType == "Admin"){
                    return next();
                } else {
                    return res.redirect('user/'+ user[0].username);
                }
            })
    }else{
        return res.redirect('/login');
    }
}

const logout = (req, res, next) =>{
    req.session.destroy(err => {
        if(err){
            return res.redirect('/home');
        }
            res.redirect('/home');
    })
}

////// ROUTING /////////
// Handles home and '/'
router.get(["/", "/home"], controller.getHome);

//path to '/addTicketSuccess'
router.post('/addTicketSuccess', controller.addTicket);

//Route to see all movies
router.get("/movies", controller.getMovies);
router.get("/movies/view/:title", controller.getViewMovie);

router.get("/calendar", controller.getCalendar);
/* this path is to ''*/
router.get("/user/:username/ticket/payment", controller.getPayment);
/* this path is to '/seats' */
router.get('/:showId/seats', controller.getSeats);

/////////Routes under Register Account
router.get("/register", rlActiveSession, regController.getRegister);
router.post("/register", regController.postRegister);

/////////Routes under Login////////
router.get("/login", rlActiveSession, logController.getLogin);
router.post("/login", logController.postLogin);

///////Routes Involving user/////////
/* this path is to '/userprofile/:username' */
router.get('/user/:username', validUser, userController.getUserProfile);
/* this path is to '/userprofile/:username/ticket' */
router.get('/user/:username/tickets', validUser, userController.getUserTicket);
/* this path is to '/userprofile/:username/cart' */
router.get('/user/:username/cart', validUser, userController.getCart);


/* this path is to '/admin' */
router.get('/admin', validAdmin, adminController.getAdminBoard);
/* add show and add movie */
router.post('/admin/addShow', adminController.postShow);
router.post('/admin/addMovie', adminController.postMovie);

/* LOGOUT */
router.get('/logout', logout);

module.exports = router;