const express = require('express');
const router = express();

const adminController = require("../controllers/adminController");
const adminAddMovie = require("../controllers/addMovie.js");
const adminAddShow = require("../controllers/addShow.js");
const adminRemoveShow = require("../controllers/removeShow.js");
const adminChangeShow = require("../controllers/updateShow.js");

///this path is to '/admin'
router.get('/', adminController.getAdminBoard);

router.post('/', adminController.postAdminBoard);
//add show
router.post('/addShow', adminController.postAddShow);
//add movie
router.post('/addMovie', adminController.postAddMovie);

router.post('/addShow',adminAddShow.postShow);
router.post('/addMovie',adminAddMovie.postMovie);
router.delete('/removeShow',adminRemoveShow.deleteShow);
router.put('/changeShow',adminChangeShow.updateShow);


module.exports = router;