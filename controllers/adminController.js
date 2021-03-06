const db = require('../models/database.js');
const mongoose = require('mongoose');
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');
const Seats = require('../models/SeatsModel.js');
const Tickets = require('../models/TicketsModel.js');
const Ratings = require('../models/RatingsModel.js');
const multer = require('multer');


//Functions for adminController
const adminController = {
    /*
        VARIABLES:
        
    */
    getAdminBoard: function(req, res, next) {
            
            db.findMany(Movies,{},'title _id',function(movie){    
                movie = quick_Sort(movie);

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
                     //isSignedIn: true,
                     username: req.session.userId,
                     movies: movie,
                     show: show
                    }) 
                }).catch(err=>{
                    return res.redirect('/');
                })
            })
    },

    postMovie: function(req, res, next) {

        //multer storage
        const storage = multer.diskStorage({
          destination: './public/assets/MoviePosters/',
          filename: function(req, file, cb) {
            cb(null,file.originalname);
          }
        });

        const upload = multer({
            storage: storage
        }).single('addMoviePoster');

        upload(req, res, (err) => {
            if (!err){  
                //console.log(req.file.destination);
                    var textABox = req.body.addMovieCast;
                    var castArray = textABox.split(/\n+/);
                    let retrievedData = {
                        _id: new mongoose.Types.ObjectId(),
                        genre: req.body.addMovieGenre,
                        title: req.body.addMovieTitle,
                        aveScore: 0,
                        synopsis: req.body.addMovieSynopsis,
                        cast: castArray,
                        posterUrl:'/assets/MoviePosters/' + req.file.originalname,
                        trailerUrl:req.body.addMovieTrailer,
                    }
                    
                    // db.findOne(Movies,{title: req.body.addMovieTitle},'', movie=>{
                    //     if (movie){
                            try {
                                db.insertOne(Movies, retrievedData, result=>{
                                if (result)
                                    console.log("Successfully added document to Movies collection.");
                                else console.log("Error inserting to Movies collection");
                                });
                            } catch(e) {console.log(e);}
                    //     }
                    //     else
                    //     {
                    //         console.log("Movie title taken");
                    //     }
                    // })

                    //display
                    res.redirect('/admin');
            }
        })
    },

    postEditMovie: (req, res, next)=>{
        //multer storage
        const storage = multer.diskStorage({
            destination: './public/assets/MoviePosters/',
            filename: function(req, file, cb) {
              cb(null,file.originalname);
            }
          });
  
          const update = multer({
              storage: storage
          }).single('editMoviePoster');

          update(req, res, (err) => {
            if (!err){  
                //console.log(req.file.destination);
                    var textABox = req.body.editMovieCast;
                    var castArray = textABox.split(/\n+/);
                    let retrievedData = {
                        _id: new mongoose.Types.ObjectId(req.body.editMovieID),
                        genre: req.body.editMovieGenre,
                        title: req.body.editMovieTitle,
                        aveScore: 0,
                        synopsis: req.body.editMovieSynopsis,
                        cast: castArray,
                        posterUrl:'/assets/MoviePosters/' + req.file.originalname,
                        trailerUrl:req.body.editMovieTrailer,
                    }

                    console.table(retrievedData)
                    
                    // db.findOne(Movies,{title: req.body.addMovieTitle},'', movie=>{
                    //     if (movie){
                    try {
                        db.updateOne(Movies, {_id: req.body.editMovieID}, retrievedData, result=>{
                            if (result) console.log("Successfully updated movie details.");
                            else console.log("Error updating movie details");
                        })
                    } catch(e) {console.log(e);}

                            /* db.insertOne(Movies, retrievedData, result=>{
                            if (result)
                                console.log("Successfully added document to Movies collection.");
                            else console.log("Error inserting to Movies collection");
                            }); */
                    //     }
                    //     else
                    //     {
                    //         console.log("Movie title taken");
                    //     }
                    // })

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

        try {
            db.findOne(Movies,{_id: retrievedData.movieID},'',function(movie){
                d = new Date(req.body.showMovieDate);
                day = d.getDay()+1;

                createdShowID = new mongoose.Types.ObjectId(); //generated showID to insert in show schema

                try {
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
                } catch(e) {console.log(e);}


                for (var i=1;i<=4;i++)
                {
                    for (var j=0;j<8;j++)
                    {
                        let letter = String.fromCharCode(65 + j);
                        try {
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
                        } catch (e) {console.log(e);}
                    }
                }
            });
        } catch (e) {console.log(e);}
        //display
        res.redirect('/admin');
    },

    updateShow: function(req, res, next) {

        d = new Date(req.body.date);
        day = d.getDay()+1;

        try {
            db.updateOne(Shows,{_id: req.body.showID},{
                dayOfWeek: day,
                date: req.body.date,
                time: req.body.time,
            },show=>{});
        } catch (e) {console.log(e);}
    },

    deleteShow: function(req, res, next) {
        //movieID is showID
        try {
            db.deleteMany(Seats,{"showID": req.body.movieID},show=>{}); //deletes all seats of the show
            db.deleteOne(Shows,{"_id": req.body.movieID},show=>{}); //deletes the show
            db.deleteMany(Tickets,{"showID": req.body.movieID},show=>{}); //delete tickets of show
        } catch (e) {console.log(e);}
    },

    deleteMovie: function(req, res, next) {
        try {
            db.findMany(Shows,{"movieID": req.body.movieID},'',show=>{
                for (let i=0;i<show.length;i++){
                    db.deleteMany(Seats,{"showID": show[i]},seat=>{}); //deletes all seats of shows
                    db.deleteMany(Tickets,{"showID": show[i]},tickets=>{}) //deletes all tickets of shows
                }
            });
            db.deleteMany(Ratings,{"movieID": req.body.movieID},ratings=>{}); //deletes all reviews and ratings
            db.deleteMany(Shows,{"movieID": req.body.movieID},show=>{}); //deletes all show
            db.deleteOne(Movies,{"_id": req.body.movieID},movie=>{}); //deletes the movie
        } catch (e) {console.log(e);}
    },


    //AJAX for edit Movie
    fetchMovie: (req, res, next)=>{
        let mID = req.query._id;
        try {
            db.findOne(Movies, {_id: mID}, '',  result=>{
                if (result) return res.send(result);
                else return res.send(false);
            })
        } catch (e) {console.log(e);}
    }


}

function quick_Sort(movie) {
    if (movie.length <= 1) { 
        return movie;
    } else {

        var left = [];
        var right = [];
        var newArray = [];
        var pivot = movie.pop();
        var length = movie.length;

        for (var i = 0; i < length; i++) {
            let r = movie[i].title.localeCompare(pivot.title);
            if (r == 0 || r == -1) {
                left.push(movie[i]);
            } else {
                right.push(movie[i]);
            }
        }

        return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
    }
}

module.exports = adminController;