const express = require('express');
const router = express();

const adminController = require("../controllers/adminController");

///this path is to '/admin'
router.get('/', adminController.getAdminBoard);
router.post('/', adminController.postAdminBoard);
//add show
router.post('/addShow', adminController.postAddShow);
//add movie
router.post('/addMovie', adminController.postAddMovie);

module.exports = router;