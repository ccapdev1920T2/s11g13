//Insert db model dependencies here
const db = require('../models/database.js');
const mongoose = require('mongoose');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');


//Functions for addMovie
const addMovie = {

    postMovie: function(req, res, next) {

        var textABox = req.body.addMovieCast;
        var castArray = textABox.split(/\n+/);
        var castNameArray = castArray.split(/\s+/);
        let retrievedData = {
            _id: new mongoose.Types.ObjectId(),
            genre: req.body.addMovieGenre,
            title: req.body.addMovieTitle,
            aveScore: req.body.addMovieScore,
            synopsis: req.body.addMovieSynopsis,
            cast: castArray,
            posterUrl:null,
            trailerUrl:null,
        }
        db.insertOne(Movies,retrievedData);

        //display
        db.findMany(Movies,{},'title _id',function(movie){
            Shows.find().select("time date dayOfWeek").populate('movieID').exec().then(s=>{
                let show = [];
                for (let i=0;i<s.length;i++)
                {
                    var d = new Date(s[i].date); //ISODate
                    year = d.getFullYear(); //year of ISODate
                    month = d.getMonth()+1 //month of ISODate
                    dt = d.getDate(); //day of ISOdate
                    if (dt < 10) { //get number of days
                        dt = '0' + dt;                        }
                        if (month < 10) { //get number of months
                            month = '0' + month;
                        }
                        formattedDate = year + '-' + month + '-' + dt; //formatted date yyyy-mm-dd
                        showObj = 
                            {
                                title: s[i].movieID.title,
                                genre: s[i].movieID.genre,
                                rating: s[i].movieID.aveScore,
                                day: s[i].dayOfWeek,
                                date: formattedDate,
                                time: s[i].time,
                            }
                    show.push(showObj); //push object to array
                }
                    res.redirect('/admin'); 
            })
        })
    }
}

module.exports = addMovie;