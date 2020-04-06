//Insert db model dependencies here
const db = require('../models/database.js');
const mongoose = require('mongoose');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const multer = require('multer');


//Functions for addMovie
const addMovie = {

    postMovie: function(req, res, next) {

        //multer storage
        const storage = multer.diskStorage({
          destination: '/assets/MoviePosters/',
          filename: function(req, file, cb) {
            cb(null,file.fieldname);
          }
        });

        const upload = multer({
            storage: storage
        }).single('addMoviePoster');

        upload(req, res, (err) => {
            if (!err){  
                console.log(req.file.destination);
                    var textABox = req.body.addMovieCast;
                    var castArray = textABox.split(/\n+/);
                    let retrievedData = {
                        _id: new mongoose.Types.ObjectId(),
                        genre: req.body.addMovieGenre,
                        title: req.body.addMovieTitle,
                        aveScore: req.body.addMovieScore,
                        synopsis: req.body.addMovieSynopsis,
                        cast: castArray,
                        posterUrl:req.file.destination + req.file.originalname,
                        trailerUrl:null, //havent done this yet
                    }
                    db.insertOne(Movies,retrievedData);

                    //display
                    res.redirect('/admin');
            }
        })
    }
}

module.exports = addMovie;