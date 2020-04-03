const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/UsersModel.js');
const jwt = require('jsonwebtoken');

const loginController = {
        //Render login page
        getLogin: function(req, res, next){
            res.render("login", {
                pageName: "Log In",
                
            })
        },
    
        postLogin: (req, res, next)=>{
            // console.log('yes');
            User.find({username: req.body.username})
                .exec()
                .then(user=>{
                    if (user.length < 1){
                        return res.status(401).json({
                            message: 'Authentication failed'
                        });
                    }
                    bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                        if(err){
                            return res.status(401).json({
                                //password dont match
                                message: 'Authentication failed'
                            });
                        }
                        if (result) {
                            const token = jwt.sign(
                                {
                                email: user[0].email,
                                username: user[0].username,
                                userId: user[0]._id
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "1h"
                                }
                            );
                            // return res.status(200).json({
                            //     message: 'Authentication successful',
                            //     token: token;
                            // });
                            if(user[0].userType.localeCompare("User")){
                                return res.render("admin");
                            }
                            else{
                                return res.render("userprofile");
                            };
                        }
                        res.status(401).json({
                            message: 'Authentication failed'
                        });
                    })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });

            /*
            let {
                username,
            } = req.body;
    
            let retrievedData = {};
    
            if(username=="jhcagaoan"){
                retrievedData = {
                    pageName: "User Profile",
                    isSignedIn: true,
                    pic: "/assets/profpic.png",
                    fname: "John Henry",
                    lname: "Cagaoan",
                    username,
                    email: "john_henry_cagaoan@dlsu.edu.ph",
                    phone: "09273667542",
                }
                // next("/userprofile/" + username, retrievedData);
            }
            else if(username=="biancarb"){
                retrievedData = {
                    pageName: "User Profile",
                    isSignedIn: true,
                    pic: "/assets/profpic.png",
                    fname: "Bianca Joy",
                    lname: "Benedictos",
                    username,
                    email: "bianca_benedictos@dlsu.edu.ph",
                    phone: "09123456789",
                }
                // next("/userprofile/" + username, retrievedData);
            }
            else if(username=="howardg"){
                retrievedData = {
                    pageName: "User Profile",
                    isSignedIn: true,
                    pic: "/assets/profpic.png",
                    fname: "Howard",
                    lname: "Montecillo",
                    username: "howardg",
                    email: "howard_montecillo@dlsu.edu.ph",
                    phone: "09876543210",
                }
                // next("/userprofile/" + username, retrievedData);
            }
    
            res.render("userprofile", retrievedData);
            */
        },
}

module.exports = loginController;
