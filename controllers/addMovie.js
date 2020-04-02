//Insert db model dependencies here
const db = require('../models/database.js');
const mongoose = require('mongoose');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');


//Functions for addMovie
const addMovie = {
    /*
        VARIABLES:
        show = title, genre, rating, day, date, time
            = list of showing movies this week
        
        FORM: New Movie
        movTitle = 
        movGenre =
        movScore =
        movSynopsis =
        movCast =
    
        FORM: New Show
        movieID = 
        date = 
        time = 
    */
    postMovie: function(req, res, next) {

        let retrievedData = {
            genre: req.body.addMovieGenre,
            title: req.body.addMovieTitle,
            aveScore: req.body.addMovieScore,
            synopsis: req.body.addMovieSynopsis,
            cast: req.body.addMovieCast,
            posterUrl:null,
            trailerUrl:null,
        }

        //db.insertOne(Shows,retrievedData1);
        db.insertOne(Movies,retrievedData);
        db.findMany(Movies,{},'title movieID',function(movie){
                    db.findMany(Shows,{},'movieID date time',function(show){
                        res.render('admin', {
                         pageName: "Admin Dashboard",
                         isSignedIn: true,
                         username: "Bh0sZxCArr3n",
                         movies: movie,
                         show: [{title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 1, date: '04-12-20', time: '12:45 - 14:15'}]
                         /*[
                             {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                             {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                             {title: 'MovieMysteryAdventure', genre: 'Mystery, Adventure', rating: '3', day: 1, date: '04-12-20', time: '12:45 - 14:15'},
                             {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                             {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                             {title: 'MovieMysteryAdventure', genre: 'Mystery, Adventure', rating: '3', day: 2, date: '04-13-20', time: '12:45 - 14:15'},
                             {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                             {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                             {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 3, date: '04-14-20', time: '12:45 - 14:15'},
                             {title: 'MovieComAdventure', genre: 'Comedy, Adventure', rating: '4', day: 4, date: '04-15-20', time: '12:45 - 14:15'},
                             {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 5, date: '04-16-20', time: '12:45 - 14:15'},
                             {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 6, date: '04-17-20', time: '12:45 - 14:15'},
                             {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 6, date: '04-17-20', time: '12:45 - 14:15'},
                             {title: 'MovieThrillerPsychological', genre: 'Thriller, Psychological', rating: '4', day: 7, date: '04-18-20', time: '12:45 - 14:15'},
                             {title: 'MovieDramaAction', genre: 'Drama, Action', rating: '5', day: 7, date: '04-18-20', time: '12:45 - 14:15'},
                         ]*/,
                        }) 
                    })
                           
                        });
        
    }
}

module.exports = addMovie;