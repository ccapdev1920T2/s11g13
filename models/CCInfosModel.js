// import module `mongoose`
const mongoose = require('mongoose');

const ccinfosSchema = new mongoose.Schema({
    email: {type: String, required: true},
    ccnumber: {type: String, required: true},
    ccexpdate: {type: Date, required: true},
    // isActive: {type: Boolean, required: true},
});

module.exports = mongoose.model("ccinfos", ccinfosSchema);