const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validators = require('validator');
const {check} = require("express-validator");

const User = require('../models/UsersModel.js');

const checker = {
    /***************Registration validator*******************/
    registerValidation: () =>{
        return [
            check('regFName')
                .not().isEmpty().withMessage("First name cannot be empty")
                .trim().escape(),
            check('regLName')
                .not().isEmpty().withMessage("Last name cannot be empty")
                .trim().escape(),
            check("regUName")
                .not().isEmpty().withMessage("Username cannot be empty")
                .isAlphanumeric().withMessage("Username cannot have special characters")
                .custom((value)=>{
                    return User.find({username: value})
                        .then(result => {
                            if (result.length>=1)
                                return Promise.reject('Username unavailable')
                            else return true;
                        }).catch(err=>{
                            return res.redirect('/');
                        })
                })
                .trim().escape(),
            check('regEmail',)
                .not().isEmpty().withMessage("Email cannot be empty")
                .isEmail().withMessage("Invalid email address")
                .custom((value)=>{
                    return User.find({email: value})
                        .then(result => {
                            if (result.length>=1)
                                return Promise.reject('Email unavailable')
                            else return true;
                        }).catch(err=>{
                            return res.redirect('/');
                        })
                })
                .normalizeEmail(),
            check("regPhone")
                .not().isEmpty().withMessage("Phone number cannot be empty")
                .isNumeric().withMessage("Invalid phone number")
                .trim().escape(),
            check("regPassword")
                .isLength({min:6}).withMessage("Password must be at least 6 characters")
                .escape(),
            check("regConfPass")
                .custom((value, {req, location, path})=>{
                    if (value != req.body.regPassword)
                        throw new Error("Passwords do not match");
                    else return true;
                })
                .escape(),
            
        ]
    },

    /***************Login validator*******************/
    //FIXME: No sanitation for loginvalidation.username
    //Need pa ba eh diba alphanumeric naman
    loginValidation: ()=>{
        return [
            check('username')
            .not().isEmpty().withMessage("Invalid credentials")
            .isAlphanumeric().withMessage("Invalid credentials"),

            check('password')
            .escape()
        ]
    },
    /***************Credit card validator*******************/
    ccinfovalidation: ()=>{
        return [
            check('cardNum')
            .not().isEmpty().withMessage("Credit card number cannot be blank.")
            .isCreditCard().withMessage("Invalid credit card number.")
            .trim().escape(),

            check('cardCIV')
            .not().isEmpty().withMessage("CVV cannot be blank.")
            .isLength({min:3, max:4}).withMessage("Invalid CVV")
            .trim().escape()
        ]
    },


    /**************** Add Movie Review ******************/
    //Since both add and edit forms have the same input[text] names
    sanitizeReview: ()=>{
        return [
            check('ReviewTitle')
            .trim().escape(),
            
            check('Review')
            .trim().escape()
        ]
    },

    /***************** AJAX middleware *****************/


    uniqueUsername: (req, res)=>{
        let username = req.query.username;
        User.find({username: username})
        .exec()
        .then(result=>{
            if(result.length >= 1)
                return res.send(false);
            else return res.send(true);
        }).catch(err=>{
            return res.redirect('/');
        })
        //json({uniqueUsername: false})
        //json({uniqueUsername: true})
    },
    //For registration - chained middlewares
    isInvalidEmail: (req, res, next)=>{
        let email = req.query.email;
        if (validators.isEmail(email)){
            // console.log("Validation: Email is correct format");
            return next();
        }
        else{
            // console.log("Validation: Email has wrong format")
            return res.send({error: "invalid"})
        }
    },

    uniqueEmail: (req, res, next)=>{
        let email = req.query.email;
        // console.log(email)
        User.find({email: email})
        .exec()
        .then(result=>{
            if(result.length >= 1)
                return res.send({error: "not unique"});
            else return res.send({error: "none"});
        }).catch(err=>{
            return res.redirect('/');
        })
    },

    isValidCCNum: (req, res, next)=>{
        let ccnum = req.query.cardNum;
        ccnum = validators.trim(ccnum)
        if (validators.isCreditCard(ccnum))
            return res.send(true);
        else return res.send(false);   
    },

    isValidCVV: (req, res, next)=>{
        let cvv = req.query.cardCVV;
        cvv = validators.trim(cvv)
        if (validators.isLength(cvv, {min:3, max:4}) && validators.isNumeric(cvv)){
            return res.send(true);
        }
        else return res.send(false);
    },

    isValidEmailFormat: (req, res, next)=>{
        let email = req.query.email;
        email = validators.trim(email);
        if (validators.isEmail(email))
            return res.send(true);
        else return res.send(false);
    }
    
}

module.exports = checker;