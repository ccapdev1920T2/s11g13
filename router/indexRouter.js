  
const express = require('express');
const router = express();
// controller => functions/methods
const controller = require('../controller/index');

////// ROUTING /////////
// this path is to '/'
router.get(["/", "/home"], controller.getHome);

router.get("/movies", controller.getMovies);

router.get("/calendar", controller.getCalendar);

router.get("/register", controller.getRegister);
router.post("/register", controller.postRegister);

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

router.get("/payment", controller.getPayment);

// this path is to '/asdf'
router.get('/asdf', controller.getAsdf);
//this path is to '/seats'
router.get('/seats', controller.getSeats);
//this path is to '/userprofile/:username'
router.get('/userprofile/:username', controller.getUserProfile);
//this path is to '/userprofile/:username/ticket'
router.get('/userprofile/:username/ticket', controller.getUserTicket);

module.exports = router;