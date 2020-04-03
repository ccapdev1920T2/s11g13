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
                    res.render('admin', {
                     pageName: "Admin Dashboard",
                     isSignedIn: true,
                     username: "Bh0sZxCArr3n",
                     movies: movie,
                     show: show
                    }) 
                })
            })
    }
}

module.exports = adminController;