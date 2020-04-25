const express = require('express');
const router = express();

const userController = require("../controllers/userController");
const session_auth = require("../middlewares/session-auth");

///////Routes Involving user//////////
//this path is to '/userprofile/:username'
router.get('/:username', session_auth.validUser, userController.getUserProfile);

router.get('/:username/tickets', session_auth.validUser, userController.getUserTicket);

router.post('/:username/editProfile',userController.editProfile);


module.exports = router;