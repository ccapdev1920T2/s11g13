const express = require('express');
const router = express();

const controller = require('../controllers/indexController');

//Route to see all movies
router.get("/", controller.getMovies);
router.get("/view", controller.getViewMovie);

module.exports = router;