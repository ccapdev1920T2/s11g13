const db = require('../models/database.js');
const mongoose = require('mongoose');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Seats = require('../models/SeatsModel.js');
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
    },

    updateShow: function(req, res, next) {

        d = new Date(req.body.date);
        day = d.getDay()+1;

        db.updateOne(Shows,{_id: req.body.showID},{
            dayOfWeek: day,
            date: req.body.date,
            time: req.body.time,
        });

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
    },

    deleteShow: function(req, res, next) {

        db.deleteMany(Seats,({"showID": req.body.movieID})); //movieID is showID
        db.deleteOne(Shows,{"_id": req.body.movieID}); //movieID is showID
        
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

module.exports = adminController;