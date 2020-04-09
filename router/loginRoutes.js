const express = require('express');
const router = express();

const logController = require("../controllers/loginController");
const session_auth = require("../middlewares/session-auth");
/////////Routes under Login////////
router.get("/", session_auth.rlActiveSession, logController.getLogin);
router.post("/", logController.postLogin);

module.exports = router;