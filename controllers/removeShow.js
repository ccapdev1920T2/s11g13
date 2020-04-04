const db = require('../models/database.js');
const mongoose = require('mongoose');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');


//Functions for removeShow
const removeShow = {
    
    deleteShow: function(req, res, next) {

        db.deleteOne(Shows,{"_id": req.body.movieID});
        console.log(req.body.movieID);

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
                      dt = '0' + dt;
                    }
                    if (month < 10) { //get number of months
                      month = '0' + month;
                    }
                    formattedDate = month + '/' + dt + '/' + year; //formatted date mm-dd-yyyy
                    showObj = 
                        {
                            movieID: s[i]._id,
                            title: s[i].movieID.title,
                            genre: s[i].movieID.genre,
                            rating: s[i].movieID.aveScore,
                            day: s[i].dayOfWeek,
                            date: formattedDate,
                            time: s[i].time,
                        }
                    show.push(showObj); //push object to array
                }
                
            })
        })
    }
        
}

module.exports = removeShow;