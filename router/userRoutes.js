const express = require('express');
const router = express();

const userController = require("../controllers/userController");

///////Routes Involving user//////////
//this path is to '/userprofile/:username'
router.get('/:username', userController.getUserProfile);
//this path is to '/userprofile/:username/ticket'
router.get('/:username/tickets', userController.getUserTicket);
//this path is to '/userprofile/:username/cart'
router.get('/:username/cart', userController.getCart);


module.exports = router;