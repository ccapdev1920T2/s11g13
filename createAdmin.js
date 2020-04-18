/*============================= CREATE ADMIN =============================*/
const db = require('./models/database');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/UsersModel.js');

db.connect()

db.findOne(User, {userType: "Admin"}, null, (result)=>{
    //match found
    if (result){
        db.deleteOne(User, {userType:"Admin"}, (isDeleted)=>{
            if (isDeleted)
                console.log("Successfully deleted existing admin account.");
            else
                console.log("Error in deleting existing admin account");
        })
    }

    bcrypt.hash("p455w0rd", 10, (err, hash)=>{
        if (err){
            return res.status(500).json({
                error:err
            });
        } else {
            const userDoc = new User({
                _id: new mongoose.Types.ObjectId(),
                email: 'admin@dlsu.edu.ph',
                username: 'bh0zXsArR3n',
                password: hash, 
                userType: 'Admin',
                firstName: 'Admin',
                lastName: 'Manager',
                pic: '/assets/profpic.png',
            });
            

            db.insertOne(User, userDoc, isInserted=>{
                if(isInserted)
                    console.log("Admin account created successfully.")
                else
                    console.log("Error in creating new Admin account")
                
                return db.close()
            })

        }
    });

})
/*====================================================================*/