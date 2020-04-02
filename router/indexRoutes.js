const express = require('express');
const router = express();

// controllers that provide functions depending on post or get
const controller = require('../controllers/indexController');
const regController = require("../controllers/registerController");

////// ROUTING /////////
// Handles home and '/'
router.get(["/", "/home"], controller.getHome);

router.get("/calendar", controller.getCalendar);

router.get("/payment", controller.getPayment);

//this path is to '/seats'
router.get('/seats', controller.getSeats);

/* Ajax routes */
router.get('/asyncFindUName', regController.checkUName)


module.exports = router;