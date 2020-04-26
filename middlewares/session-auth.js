const User = require('../models/UsersModel.js');
const db = require("../models/database.js");

const authenticator = {
    rlActiveSession: (req, res, next) =>{
        if (req.session.userId){
            db.findOne(User, {username: req.session.userId}, '', function(user){
                return res.redirect('user/'+ user.username);
            })
        }else{
            return next();
        }
    },
    
    validUser: (req, res, next) =>{
        if (req.session.userId){
            db.findOne(User, {username: req.session.userId}, '', function(user){
                if (user.username == req.params.username){
                    if (user.userType == "User"){
                        return next();
                    } else {
                        res.redirect('/admin');
                    }
                } else {
                    return res.redirect('/user/'+ user.username);
                }
            });
        }else{
            return res.redirect('/login');
        }
    },
    
    validAdmin: (req, res, next) =>{
        if (req.session.userId){
            db.findOne(User, {username: req.session.userId}, '', function(user){
                if(user.userType == "Admin"){
                    return next();
                }
                else{
                    return res.redirect('user/'+ user.username);
                }
            });
        }else{
            return res.redirect('/login');
        }
    },
    
    logout: (req, res, next) =>{
        req.session.destroy(err => {
            if(err) throw err;
            
            return res.redirect('/home');
        })
    },

    pActiveSession: (req, res, next) =>{
        if (req.session.userId){
            next();
        }
        else
            return res.redirect('/login');
    }
}

module.exports =  authenticator