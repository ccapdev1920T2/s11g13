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

router.get("/calendar", controller.getCalendar, session_auth.validUser);

router.post("/payment", session_auth.pActiveSession, controller.getPayment);

router.get('/logout', session_auth.logout);

router.get('/confirmEmail', controller.getConfirmEmail);

router.post('/addTicketSuccess', controller.addTicket);

/* Ajax routes */
router.get('/checkUniqueUName', formchecker.uniqueUsername)
router.get('/checkEmail', formchecker.isInvalidEmail, formchecker.uniqueEmail)

router.get('/checkCCNumber', formchecker.isValidCCNum);
router.get('/checkCVV', formchecker.isValidCVV);
router.get('/checkPaymentEmail', formchecker.isValidEmailFormat);


module.exports = router;