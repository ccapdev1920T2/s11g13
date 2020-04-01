// import module `mongoose`
const mongoose = require('mongoose');

const seatsSchema= new mongoose.Schema({
    showID: {type: String, required: true},
    seatNum: {type: String, required: true},
    seatPrice: {type: Number, required: true},
    isTaken: {type: Boolean, required: true},
});

module.exports = mongoose.model("seats", seatsSchema);