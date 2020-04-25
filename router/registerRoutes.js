const express = require('express');
const router = express();

const regController = require("../controllers/registerController");
const formchecker = require("../middlewares/form-validation");
const session_auth = require("../middlewares/session-auth");

/////////Routes under Register Account
router.get("/", session_auth.rlActiveSession, regController.getRegister);
router.post("/", formchecker.registerValidation() , regController.postRegister);

module.exports = router;