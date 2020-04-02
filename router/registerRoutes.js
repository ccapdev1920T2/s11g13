const express = require('express');
const router = express();

const regController = require("../controllers/registerController");

/////////Routes under Register Account
router.get("/", regController.getRegister);
router.post("/", regController.postRegister);

module.exports = router;