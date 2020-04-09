//Insert db model dependencies here
// const express = require('express');
// const router = express.Router();
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
        console.log(req.body)
        const errors = validationResult(req).array({onlyFirstError: true}); //Get errors from express-validator routes
        
        console.table(errors)
        if (errors.length > 0){
            return res.status(422).render("register", {
                pageName: "Register",
                errors: errors,
            })
        }
        else {
            console.log("No errors!")
            User.find({email: req.body.regEmail})
            .exec()
            .then(user => {
                if(user.length >= 1){
                    // return res.status(409).json({
                    //     message: 'Mail exists'
                    // });
                    return res.status(409).render("register", {
                        pageName: "Register",
                        errors: [{msg: "Email address unavailable"}],
                    })
                    //can be any of the two errors:
                    //409 -conflict with data
                    //402 -unprocessable data
                } else{
                    User.find({username: req.body.regUName})
                    .exec()
                    .then(user => {
                        if(user.length >= 1){
                            // return res.status(409).json({
                            //     message: 'Username exists'
                            // });
                            return res.status(422).render("register", {
                                pageName: "Register",
                                errors: [{msg: "Username unavailable"}],
                            })
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
                                        console.log("User account created.")
                                        return res.redirect('/confirmEmail')
                                    })
                                    .catch(err=>{
                                        console.log(err);
                                        // res.status(500).json({
                                        //     error: err
                                        return res.redirect(500, '/error');
                                    });
                                };
                            })
                        }
                    })
        
                }
            })
        }
    },

    checkUName: (req, res)=>{
        let uname = req.query.username;
        User.find({username: uname})
        .exec()
        .then(result=>{
            res.send(result);
        })        
    },

    checkEmail: (req, res)=>{
        let email = req.query.email;
        User.find({email: email})
        .exec()
        .then(result=>{
            res.send(result);
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

module.exports = registerController;