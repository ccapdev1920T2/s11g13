//Insert db model dependencies here
// const express = require('express');
// const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/UsersModel.js');


//Functions for userController
const registerController = {

    postRegister: (req, res, next)=>{
        User.find({email: req.body.regEmail})
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'Mail exists'
                });
                //can be any of the two errors:
                //409 -conflict with data
                //402 -unprocessable data
            } else{
                User.find({username: req.body.regUName})
                .exec()
                .then(user => {
                    if(user.length >= 1){
                        return res.status(409).json({
                            message: 'Username exists'
                        });
                        //can be any of the two errors:
                        //409 -conflict with data
                        //402 -unprocessable data
                    } else{
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
                                user
                                .save()
                                .then(result =>{
                                    res.status(201).json({
                                        message: 'User created'
                                    });
                                })
                                .catch(err=>{
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                            }
                        });
                    }
                })
            }
        })
        
            
        
    },

    getRegister: function(req, res, next){
        res.render("register", {
            pageName: "Register",
        })
    },

    // postRegister: (req, res, next)=>{
    //     let {
    //         regFName,
    //         regLName,
    //         regUName,
    //         regEmail,
    //         regPhone,
    //     } = req.body;
        
    //     let retrievedData = {
    //         pageName: "User Profile",
    //         isSignedIn: true,
    //         fname: regFName,
    //         lname: regLName,
    //         username: regUName,
    //         email: regEmail,
    //         phone: regPhone,
    //     };

    //     console.log(retrievedData);
    //     res.render("userprofile", retrievedData);
    // },
};

function uniqueUser(req){
    User.find({email: req.body.regEmail})
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'Mail exists'
                });
                //can be any of the two errors:
                //409 -conflict with data
                //402 -unprocessable data
            } else{
                User.find({username: req.body.regUName})
                .exec()
                .then(user => {
                    if(user.length >= 1){
                        return res.status(409).json({
                            message: 'Username exists'
                        });
                        //can be any of the two errors:
                        //409 -conflict with data
                        //402 -unprocessable data
                    } else{
                        return true;
                    }
                })
            }
        })
};


module.exports = registerController;