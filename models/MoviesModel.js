
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var MoviesSchema = new mongoose.Schema({
    
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
        type: String
    }
});

// exports a mongoose.model object based on `UserSchema` (defined above)
// when another script exports from this file
// This model executes CRUD operations
// to collection `users` -> plural of the argument `User`
module.exports = mongoose.model('movies', MoviesSchema);