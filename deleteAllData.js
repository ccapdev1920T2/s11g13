const db = require('./models/database.js');
const db2 = require('./models/database_old.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Users = require('./models/UsersModel.js');
const Movies = require('./models/MoviesModel.js');
const Shows = require('./models/ShowsModel.js');
const Seats = require('./models/SeatsModel.js');
const Ratings = require('./models/RatingsModel.js');
const Tickets = require('./models/TicketsModel.js');
const CCInfos = require('./models/CCInfosModel.js');
const multer = require('multer');

db.connect();

db.deleteMany(Users, {}, callback=>{
    db.deleteMany(Movies, {}, callback=>{
        db.deleteMany(Shows, {}, callback=>{
            db.deleteMany(Seats, {}, callback=>{
                db.deleteMany(Ratings, {}, callback=>{
                    db.deleteMany(Tickets, {}, callback=>{
                        db.deleteMany(CCInfos, {}, callback=>{
                            db.close();
                        });
                    });
                });
            });
        });
    });
});