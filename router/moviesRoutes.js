const express = require('express');
const router = express();

const controller = require('../controllers/indexController');

//Route to see all movies
router.get("/", controller.getMovies);
router.get("/view/:title", controller.getViewMovie);

//this path is to '/seats'
router.get('/seats/:showID', controller.getSeats);

module.exports = router;