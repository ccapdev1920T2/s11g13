const express = require('express');
const router = express();

const userController = require("../controllers/userController");
const session_auth = require("../middlewares/session-auth");

///////Routes Involving user//////////
//this path is to '/userprofile/:username'
router.get('/:username', session_auth.validUser, userController.getUserProfile);
//this path is to '/userprofile/:username/ticket'
router.get('/:username/tickets', session_auth.validUser, userController.getUserTicket);
//this path is to '/userprofile/:username/cart'
//router.get('/:username/cart', session_auth.validUser, userController.getCart);
//this path is to '/userprofile/:username/editProfile'
router.put('/:username/editProfile',userController.editProfile);


module.exports = router;