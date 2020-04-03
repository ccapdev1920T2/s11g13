const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validators = require('validator');

const User = require('../models/UsersModel.js');

const checker = {
    uniqueUsername: (req, res)=>{
        let username = req.query.username;
        User.find({username: username})
        .exec()
        .then(result=>{
            if(result.length >= 1)
                res.send(false);
            else res.send(true);
        }) 
        //json({uniqueUsername: false})
        //json({uniqueUsername: true})
    },

    isInvalidEmail: (req, res, next)=>{
        let email = req.query.email;
        if (validators.isEmail(email)){
            console.log("Validation: Email is correct format");
            next();
        }
        else{
            console.log("Validation: Email has wrong format")
            res.send({error: "invalid"})
        }
    },

    uniqueEmail: (req, res, next)=>{
        let email = req.query.email;
        console.log(email)
        User.find({email: email})
        .exec()
        .then(result=>{
            if(result.length >= 1)
                res.send({error: "not unique"});
            else res.send({error: "none"});
        })
    },

    
}

module.exports = checker;