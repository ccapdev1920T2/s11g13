const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    // unique
    _id: mongoose.Schema.Types.ObjectId,
    token: {type: String, required:false},
    email: {
        type: String, 
        required: true, 
        unique:true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username: {type: String, required: true, unique:true},
    // pass
    password: {type: String, required: true},
    // gen info
    userType: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    // optional
    mobileNumber: {type: String, required: false},
    pic: {type: String, required: false},
    // other stuffzz
    // saka ko na lagay ksks
});

module.exports = mongoose.model('USERS', userSchema);