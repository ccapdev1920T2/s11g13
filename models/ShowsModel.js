// import module `mongoose`
const mongoose = require('mongoose');

const ShowsSchema = new mongoose.Schema({
    movieID: {type: Number},
    showID: {type: String},
    date: {type: Date, required: true},
    time: {type: String, required: true},
});

module.exports = mongoose.model("shows", ShowsSchema)