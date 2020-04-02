const express = require('express');
const router = express();

const adminController = require("../controllers/adminController");

///this path is to '/admin'
router.get('/', adminController.getAdminBoard);
router.post('/',adminController.postAdminBoard);
//add show
router.post('/addShow',adminAddShow.postShow);
//add movie
router.post('/addMovie',adminAddMovie.postMovie);

module.exports = router;