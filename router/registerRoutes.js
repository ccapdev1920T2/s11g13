const express = require('express');
const router = express();

const regController = require("../controllers/registerController");
const formchecker = require("../middlewares/form-validation");

/////////Routes under Register Account
router.get("/", regController.getRegister);
router.post("/", formchecker.registerValidation() , regController.postRegister);

module.exports = router;