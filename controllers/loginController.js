// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {validationResult} = require("express-validator");
const db = require("../models/database.js")
const User = require('../models/UsersModel.js');

const loginController = {
    //Render login page
    getLogin: function(req, res, next){
        res.render("login", {
            pageName: "Log In",
        })
    },
    
    postLogin: (req, res, next)=>{
        // console.log('yes');
        console.log(req.body)
        const errors = validationResult(req).array({onlyFirstError: true}); //Get errors from express-validator routes
        
        console.table(errors)
        if (errors.length > 0){
            return res.status(403).render("login", {
                pageName: "Register",
                errors: errors,
            })
        }
        else{
            db.findOne(User, {username: req.body.username}, null, (user)=>{
                if (user){
                    bcrypt.compare(req.body.password, user.password, (err,result)=>{
                        if(err){
                            return res.status(401).render("login", {
                                pageName: "Register",
                                errors: [{msg: "Invalid credentials"}],
                            })
                        } 
                        if (result) {
                            req.session.userId = user.username;
                            res.locals.user = user;

                            if(user.userType.localeCompare("User")){
                                console.log('Admin Logged In');
                                return res.redirect("/admin");
                            }
                            else{
                                console.log('User Logged In');
                                return res.redirect("/user/"+user.username);
                            };
                        }
                        
                        // return res.status(401).render("login", {
                        //     pageName: "Register",
                        //     errors: [{msg: "Invalid credentials"}],
                        // })
                    })
                }
                else{
                    return res.status(403).render("login", {
                        pageName: "Register",
                        errors: [{msg: "Invalid credentials"}],
                    }) 
                }
            });
        }
    },
}

module.exports = loginController;