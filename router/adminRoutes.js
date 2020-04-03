const express = require('express');
const router = express();

const adminController = require("../controllers/adminController");
const adminAddMovie = require("../controllers/addMovie.js");
const adminAddShow = require("../controllers/addShow.js");
const adminRemoveShow = require("../controllers/removeShow.js")

///this path is to '/admin'
router.get('/', adminController.getAdminBoard);
router.post('/addShow',adminAddShow.postShow);
router.post('/addMovie',adminAddMovie.postMovie);
router.delete('/removeShow',adminRemoveShow.deleteShow);

module.exports = router;