const express = require('express');
const router = express();

const logController = require("../controllers/loginController");

/////////Routes under Login////////
router.get("/", logController.getLogin);
router.post("/", logController.postLogin);

module.exports = router;