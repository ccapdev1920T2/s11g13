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
                                //return res.send('Succesfully saved.');
                            });

                            if(user[0].userType.localeCompare("User")){
                                req.session.userId = ntoken;
                                res.locals.user = user[0];
                                return res.redirect("/admin");
                            }
                            else{
                                req.session.userId = user[0].username;
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
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });
        },
}

module.exports = loginController;
