const db = require('../models/database.js');
const mongoose = require('mongoose');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Seats = require('../models/SeatsModel.js');

//Functions for addMovie
const addShow = {
    
    postShow: function(req, res, next) {
        
        let retrievedData = {
            movieID: req.body.showMovieID,
            time: req.body.showMovieTime,
            date: req.body.showMovieDate
        }

        db.findOne(Movies,{_id: retrievedData.movieID},'',function(movie){
            d = new Date(req.body.showMovieDate);
            day = d.getDay()+1;

            createdShowID = new mongoose.Types.ObjectId(); //generated showID to insert in show schema

            db.insertOne(Shows,{_id: createdShowID, movieID: movie._id,dayOfWeek: day,date: req.body.showMovieDate, time: req.body.showMovieTime});
            for (var i=1;i<=4;i++)
            {
                for (var j=0;j<8;j++)
                {
                    var letter = "";
                    if (j == 0)
                        letter = "A";
                    else if (j == 1)
                        letter = "B";
                    else if (j == 2)
                        letter = "C";
                    else if (j == 3)
                        letter = "D";
                    else if (j == 4)
                        letter = "E";
                    else if (j == 5)
                        letter = "F";
                    else if (j == 6)
                        letter = "G";
                    else if (j == 7)
                        letter = "H";
                    db.insertOne(Seats,{_id: new mongoose.Types.ObjectId(), showID: createdShowID, seatNum: i+letter, seatPrice: 200, isTaken: false});
                }
            }
        });
        //display
        res.redirect('/admin');
    }
        
}

module.exports = addShow;