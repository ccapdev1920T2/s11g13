const express = require('express');
const router = express();

// controllers that provide functions depending on post or get
const controller = require('../controllers/indexController');
// const regController = require("../controllers/registerController");

const formchecker = require("../middlewares/form-validation")
const session_auth = require("../middlewares/session-auth");

////// ROUTING /////////
// Handles home and '/'
router.get(["/", "/home"], controller.getHome);

router.get("/calendar", controller.getCalendar);

router.post("/payment", controller.getPayment);

router.post('/:username/cart', controller.addTicket);

router.get('/logout', session_auth.logout);

/* Ajax routes */
router.get('/checkUniqueUName', formchecker.uniqueUsername)
router.get('/checkEmail', formchecker.isInvalidEmail, formchecker.uniqueEmail)
// router.get("/checkEmail", )

module.exports = router;