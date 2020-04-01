// import module `mongoose`
const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({
    username: {type: String, required: true},
    movieID: {type: Number, required: true},
    starRating: {type: Number, required: true},
    comment: {type: String, required: true},
});

module.exports = mongoose.model("ratings", ratingsSchema);