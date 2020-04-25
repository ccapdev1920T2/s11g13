//Insert db model dependencies here
// const express = require('express');
// const router = express.Router();
const db = require("../models/database.js")
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {validationResult} = require("express-validator");

const User = require('../models/UsersModel.js');


//Functions for userController
const registerController = {
    getRegister: function(req, res, next){
        res.render("register", {
            pageName: "Register",
        })
    },

    postRegister: (req, res, next)=>{
        const errors = validationResult(req).array({onlyFirstError: true}); //Get errors from express-validator routes
        
        //console.table(errors)
        if (errors.length > 0){
            return res.status(422).render("register", {
                pageName: "Register",
                errors: errors,
                initValues: req.body
            })
        }
        else {
            //console.log("No errors!")

            db.findOne(User, {email: req.body.regEmail}, '', function(result){
                if (result){
                    return res.status(422).render("register", {
                        pageName: "Register",
                        errors: [{msg: "Username unavailable"}],
                    })
                    //can be any of the two errors:
                    //409 -conflict with data
                    //402 -unprocessable data
                }

                else {
                    bcrypt.hash(req.body.regPassword, 10, (err, hash)=>{
                        if (err){
                            return res.status(500).json({
                                error:err
                            });
                        } else {
                            const user = new User({
                                password: hash,
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.regEmail,
                                username: req.body.regUName,
                                password: hash,
                                userType: "User",
                                firstName: req.body.regFName,
                                lastName: req.body.regLName,
                                mobileNumber: req.body.regPhone,
                                pic: "./assets/profpic.png",
                            });
                            
                            return db.insertOne(User, user, function(result){
                                if (result){
                                    req.session.userId = user.username;
                                    res.locals.user = user;
                                    // console.log(req.session.userId);
                                    // console.log("User account created!");
                                    return res.redirect("/confirmEmail");
                                }
                                else {
                                    //console.log("Error in creating user account")
                                    return res.status(500).redirect("/error")
                                }
                            })
                        };
                    })
                }
            })
        }
    },

    checkUName: (req, res)=>{
        let uname = req.query.username;
        db.findOne(User, {username: uname}, '', function(result){
            res.send(result);
        })      
    },

    checkEmail: (req, res)=>{
        let email = req.query.email;
        db.findOne(User, {email: email}, '', function(result){
            res.send(result);
        })       
    },
};

module.exports = registerController;