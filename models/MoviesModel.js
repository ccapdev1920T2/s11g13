
// import module `mongoose`
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// defines the schema for collection `movies`
var MoviesSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId, //movieID
    title: {
        type: String
    },
    genre: {
        type: String
    },
    aveScore: {
        type: Number
    },
    synopsis: {
        type: String
    },
    posterUrl: {
        type: String
    },
    trailerUrl: {
        type: String
    },
    cast: {
        type: Array
    },
    //shows: [{type: Schema.Types.ObjectId, ref: 'Shows'}]
});

// exports a mongoose.model object based on `UserSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `users` -> plural of the argument `User`
module.exports = mongoose.model('movies', MoviesSchema);