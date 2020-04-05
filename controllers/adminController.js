//Insert db model dependencies here
// import module `database` from `../models/db.js`
const db = require('../models/database.js');
const mongoose = require('mongoose');
// import module `User` from `../models/UserModel.js`
const Movies = require('../models/MoviesModel.js');
const Shows = require('../models/ShowsModel.js');


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
                    res.render('admin', {
                     pageName: "Admin Dashboard",
                     isSignedIn: true,
                     username: "Bh0sZxCArr3n",
                     movies: movie,
                     show: show
                    }) 
                })
            })

                   
                });
        
        /*
        res.render('admin', {
            pageName: "Admin Dashboard",
            isSignedIn: true,
            username: "Bh0sZxCArr3n",
            movies: a
                
                {title: "To All The Boys P.S. I Still Love You", movie_id:23},
                {title: "The Lightning Thief", movie_id:101},
                {title: "Ice Age", movie_id:103},
                {title: "The Conjuring", movie_id: 156},
                {title: "It", movie_id: 256},
                {title: "Taken", movie_id: 269},
                {title: "Avengers: Civil War", movie_id: 298},
                {title: "Captain America: The Winter Soldier", movie_id: 302},
                {title: "Doctor Who - The Day of the Doctor", movie_id: 307},
                
            ,
            show: [
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
            ],
        }
        )*/
    },

    postAdminBoard: function(req, res, next) {
        /*
        var record = {
            title: req.body.addMovieTitle,
            genre: req.body.addMovieGenre,
            aveScore: req.body.addMovieScore,
            synopsis: req.body.addMovieSynopsis,
            cast: req.body.addMovieCast
        }
        */

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
                         show: [{ date: '04-12-20', time: '12:45 - 14:15'}]
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
        
    },

    postAddMovie: function(req, res, next) {

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
        
    },

    postAddShow: function(req, res, next) {
        
        let retrievedData = {
            time: req.body.showMovieTime,
            date: req.body.showMovieDate
        }

        console.log(retrievedData);

        //db.insertOne(Shows,retrievedData1);
        db.insertOne(Shows,retrievedData);
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

module.exports = adminController;