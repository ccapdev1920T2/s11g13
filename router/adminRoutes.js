const express = require('express');
const router = express();

const adminController = require("../controllers/adminController");

///this path is to '/admin'
router.get('/', adminController.getAdminBoard);
router.post('/',adminController.postAdminBoard);

module.exports = router;