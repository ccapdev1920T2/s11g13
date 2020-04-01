// import module `mongoose`
const mongoose = require('mongoose');

const ticketsSchema= new mongoose.Schema({
    movieID: {type: Number, required: true},
    showID: {type: String, required: true},
    email: {type: String, required: true},
    transID: {type: String, required: true},
    totalPrice: {type: Number, required: true},
});

module.exports = mongoose.model("tickets", ticketsSchema);