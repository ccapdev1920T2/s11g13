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
            console.log(req.body.username)
            User.find({username: req.body.username})
                .exec()
                .then(user=>{
                    if (user.length < 1){
                        // return res.status(401).json({
                        //     message: 'Authentication failed'
                        // });
                        console.log('Authentication failed: User length <1?' + user);
                    }
                    bcrypt.compare(
                        bcrypt.hash(req.body.password, 10, (err, hash)=>{
                            if (err) throw err;
                            else{ 
                                console.log("Hash from req.body: "+ hash);
                                return hash
                            };
                        }), user[0].password, (err,result)=>{
                        if(err){
                            // return res.status(401).json({
                            //     //password dont match
                            //     message: 'Authentication failed'
                            // });
                            console.log("Hash from database: "+ user[0].password)
                            console.log('Authentication failed: in bcrypt: compare');
                            console.log(result)
                        } 
                        if (result) {
                            const ntoken = jwt.sign(
                                {
                                email: user[0].email,
                                username: user[0].username,
                                userId: user[0]._id
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "2h"
                                }
                            );
                            // return res.status(200).json({
                            //     message: 'Authentication successful',
                            //     token: token;
                            // });
                            
                            User.findOneAndUpdate({username: user[0].username}, {token: ntoken}, {upsert: true}, function(err, doc) {
                                if (err) return res.send(500, {error: err});
                                console.log('token updated!');
                                //return res.send('Succesfully saved.');
                            });

                            req.session.userId = ntoken;
                            res.locals.user = user[0];
                            //req.session.userId = user[0].username;

                            if(user[0].userType.localeCompare("User")){
                                console.log('Admin Logged In');
                                return res.redirect("/admin");
                            }
                            else{
                                console.log('User Logged In');
                                return res.redirect("/user/"+user[0].username);
                            };
                        }
                        res.status(401).json({
                            message: 'Authentication failed'
                        });
                    })
                })
                .catch(err=>{
                    // console.log(err);
                    // res.status(500).json({
                    //     error:err
                    // });
                    console.log('Authentication failed');
                });
        },
}

module.exports = loginController;