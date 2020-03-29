  
const express = require('express');
const router = express();
// controller => functions/methods
const controller = require('../controller/index');

////// ROUTING /////////
// Handles home and /
router.get(["/", "/home"], controller.getHome);

//Route to see all movies
router.get("/movies", controller.getMovies);

router.get("/calendar", controller.getCalendar);

router.get("/register", controller.getRegister);
router.post("/register", controller.postRegister);

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

router.get("/payment", controller.getPayment);

router.get("/movies/view/:movieID", controller.getViewMovie);

// this path is to '/asdf'
router.get('/asdf', controller.getAsdf);
//this path is to '/seats'
router.get('/seats', controller.getSeats);
//this path is to '/userprofile/:username'
router.get('/userprofile/:username', controller.getUserProfile);

module.exports = router;