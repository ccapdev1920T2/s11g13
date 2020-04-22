const express = require('express');
const router = express();

const controller = require('../controllers/moviesController');

//Route to see all movies
router.get("/", controller.getMovies);
router.get("/view/:title", controller.getViewMovie);

//this path is to '/seats'
router.post('/seats', controller.getSeats);

//this path is to '/AddReview'
router.post('/AddReview', controller.postAddReview);

module.exports = router;