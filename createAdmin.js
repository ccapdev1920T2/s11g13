/*============================= CREATE ADMIN =============================*/
const db = require('./models/database');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/UsersModel.js');



db.connect()

User.find({userType: "Admin"})
    .exec()
    .then(user => {
        if(user.length >= 1){
            User.deleteOne({userType: 'Admin'}, function (err) {})
        }
        bcrypt.hash("p455w0rd", 10, (err, hash)=>{
            if (err){
                console.log(err)
                throw err
                // return res.status(500).json({
                //     error:err
                // });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: 'admin@dlsu.edu.ph',
                    username: 'bh0zXsArR3n',
                    password: hash, 
                    userType: 'Admin',
                    firstName: 'Admin',
                    lastName: 'Manager',
                    pic: '/assets/profpic.png',
                });
                user
                .save()
                .then(result =>{
                    console.log("Admin created!")
                    db.close()
                })
                .catch(err=>{
                    console.log(err);
                    // res.status(500).json({
                    //     error: err
                    // });
                    throw err
                });
            }
        })
    }) 
    

/*====================================================================*/