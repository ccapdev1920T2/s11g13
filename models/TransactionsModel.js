// import module `mongoose`
const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    transID: {type: String, required: true},
    MovieID: {type: Number, required: true},
    showID: {type: String, required: true},

    dateBooked: {type: Date, required: true},
    dateConfirmed: Date,
    dateCancelled: Date,
});

module.exports = mongoose.model("transactions", transactionsSchema);