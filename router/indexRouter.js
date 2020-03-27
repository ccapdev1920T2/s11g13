  
const express = require('express');
const router = express();
// controller => functions/methods
const controller = require('../controller/index');

////// ROUTING /////////
// this path is to '/'
router.get('/', controller.getHome);

router.get('/movies', controller.getMovies);

router.get('/calendar', controller.getCalendar);



// this path is to '/asdf'
router.get('/asdf', controller.getAsdf);
//this path is to '/seats'
router.get('/seats', controller.getSeats);
//this path is to '/userprofile'
router.get('/userprofile/:fname/:lname/:username/:email/:mobileNum/', controller.getUserProfile);

module.exports = router;