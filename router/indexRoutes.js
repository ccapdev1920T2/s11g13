const express = require('express');
const router = express();

// controllers that provide functions depending on post or get
const controller = require('../controllers/indexController');
// const regController = require("../controllers/registerController");

const formchecker = require("../middlewares/form-validation")

////// ROUTING /////////
// Handles home and '/'
router.get(["/", "/home"], controller.getHome);

router.get("/calendar", controller.getCalendar);

router.post("/payment", controller.getPayment);

/* Ajax routes */
router.get('/checkUniqueUName', formchecker.uniqueUsername)
router.get('/checkEmail', formchecker.isInvalidEmail, formchecker.uniqueEmail)
// router.get("/checkEmail", )

module.exports = router;