//Insert db model dependencies here
// const express = require('express');
// const router = express.Router();
const db = require("../models/database.js")
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {validationResult} = require("express-validator");

const nodemailer = require("nodemailer");
const path = require("path");

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
            try {
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
                                    pic: "/assets/ProfilePictures/profpic.jpg",
                                });
                                return db.insertOne(User, user, function(result){
                                    if (result){
                                        // req.session.userId = user.username;
                                        // res.locals.user = user;
                                        // console.log(req.session.userId);
                                        // console.log("User account created!");
                                        // return res.redirect("/confirmEmail", result.username);

                                        // * Nodemailer - send an email confirmation

                                        let transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: process.env.NODEMAILER_EMAIL,
                                                pass: process.env.NODEMAILER_PASS
                                            }
                                        });

                                        //TODO: Edit actLink to be something like herokuapp.com/activateAccount
                                        let actLink = "/activate?account="+user._id; 
                                        let context = {
                                            firstname: req.body.regFName,
                                            activationLink: actLink
                                        };

                                        res.render('email', context, (err, result)=>{
                                            if (err){
                                                db.deleteOne(User, {username: req.body.regUName}, (result)=>{
                                                    res.redirect("/error");
                                                })
                                            }
                                            else {
                                                renderedHtml = result;

                                                let mailOptions  = {
                                                    from: 'ticketorleaveit+noreply@gmail.com',
                                                    to: req.body.regEmail,
                                                    subject: 'Confirm your email for TicketOrLeaveIt',
                                                    html: renderedHtml
                                                }

                                                transporter.sendMail(mailOptions, (err, info)=>{
                                                    if (err) {
                                                        console.log("Error sending an email");
                                                        console.log(err)
                                                        db.deleteOne(User, {username: req.body.regUName}, (result)=>{
                                                            res.redirect("/error");
                                                        })
                                                    }
                                                    else {
                                                        console.log(info.response);
                                                        res.render("confirmEmail", {
                                                            pageName: "Confirm Email",
                                                            username: result.username
                                                        })
                                                    }
                                                })
                                            }
                                        })
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
            } catch(e){console.log(e);}
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