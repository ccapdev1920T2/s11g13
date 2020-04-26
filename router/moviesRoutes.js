const express = require('express');
const router = express();

const controller = require('../controllers/moviesController');

//Route to see all movies
router.get("/", controller.getMovies);
router.get("/view/:movieID", controller.getViewMovie);

//this path is to '/seats'
router.post('/seats', controller.getSeats);

//last middleware will handle movie not found
router.get('/search', controller.getSearch, controller.getMovies)

//this path is to '/AddReview'
router.post('/AddReview', controller.postAddReview);

//No router.put sksksk
router.post('/editReview', controller.editReview);

router.delete('/deleteReview', controller.deleteReview);

module.exports = router;