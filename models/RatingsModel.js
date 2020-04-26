// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingsSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'users' }, //foreign key to users
    movieID: { type: Schema.Types.ObjectId, ref: 'movies' }, //foreign key to movies
    date: {type: Date, required: true},
    starRating: {type: Number, required: true},
    commentTitle: {type: String, required: true},
    comment: {type: String, required: true},
});

module.exports = mongoose.model("ratings", ratingsSchema);