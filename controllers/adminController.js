const db = require('../models/database.js');
const mongoose = require('mongoose');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Seats = require('../models/SeatsModel.js');
const Tickets = require('../models/TicketsModel.js');
const multer = require('multer');


//Functions for adminController
const adminController = {
    /*
        VARIABLES:
        
    */
    getAdminBoard: function(req, res, next) {
            
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
                        formattedDate = month + '/' + dt + '/' + year; //formatted date mm/dd/yyyy
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
                    res.render('admin', {
                     pageName: "Admin Dashboard",
                     isSignedIn: true,
                     username: "Bh0sZxCArr3n",
                     movies: movie,
                     show: show
                    }) 
                })
            })
    },

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
                        aveScore: 0,
                        synopsis: req.body.addMovieSynopsis,
                        cast: castArray,
                        posterUrl:req.file.destination + req.file.originalname,
                        trailerUrl:req.body.addMovieTrailer,
                    }
                    db.insertOne(Movies, retrievedData, result=>{
                        if (result)
                            console.log("Successfully added document to Movies collection.");
                        else console.log("Error inserting to Movies collection");
                    });

                    //display
                    res.redirect('/admin');
            }
        })
    },

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

            db.insertOne(Shows,{
                _id: createdShowID, 
                movieID: movie._id,
                dayOfWeek: day,
                date: req.body.showMovieDate, 
                time: req.body.showMovieTime
            }, result=>{
                if (result)
                    console.log("Successfully added document to Shows collection.");
                else console.log("Error inserting to Shows collection");
            });


            for (var i=1;i<=4;i++)
            {
                for (var j=0;j<8;j++)
                {
                    let letter = String.fromCharCode(65 + j);
                    db.insertOne(Seats,{
                        _id: new mongoose.Types.ObjectId(), 
                        showID: createdShowID, 
                        seatNum: i+letter, 
                        seatPrice: 200, 
                        isTaken: false
                    }, result=>{
                        if (result)
                            console.log("Successfully added document to Seats collection.");
                        else console.log("Error inserting to Seats collection");
                    });
                }
            }
        });
        //display
        res.redirect('/admin');
    },

    updateShow: function(req, res, next) {

        d = new Date(req.body.date);
        day = d.getDay()+1;

        db.updateOne(Shows,{_id: req.body.showID},{
            dayOfWeek: day,
            date: req.body.date,
            time: req.body.time,
        },show=>{});
        /*
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
        */
    },

    deleteShow: function(req, res, next) {
        //movieID is showID
        db.deleteMany(Seats,{"showID": req.body.movieID},show=>{}); //deletes all seats of the show
        db.deleteOne(Shows,{"_id": req.body.movieID},show=>{}); //deletes the show
        db.deleteMany(Tickets,{"showID": req.body.movieID},show=>{})
        
        /*
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
        */
    }


}

module.exports = adminController;