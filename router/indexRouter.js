  
const express = require('express');
const router = express();
// controller => functions/methods
const controller = require('../controller/index');

////// ROUTING /////////
// this path is to '/'
router.get('/', controller.getHome);
// this path is to '/asdf'
router.get('/asdf', controller.getAsdf);
//this path is to '/seats'
router.get('/seats', controller.getSeats);
<<<<<<< HEAD
//this path is to '/userprofile/:fname/:lname/:username/:email/:mobileNum/'
router.get('/userprofile/:fname/:lname/:username/:email/:mobileNum/', controller.getUserProfile);
//this path is to '/userprofile'
router.get('/userprofile',controller.getUserProfile)
//this path is to '/viewTicket'
router.get('/viewTicket',controller.getViewTicket)
=======
//this path is to '/userprofile'
router.get('/userprofile/:fname/:lname/:username/:email/:mobileNum/', controller.getUserProfile);

>>>>>>> c606c26728378c7a460bdce61703058dd7cd8a75
module.exports = router;