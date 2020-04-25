// import module `mongoose`
const mongoose = require('mongoose');

const mediaSchema= new mongoose.Schema({
    movieID: {type: Number, required: true,},
    filename: {type: String, required: true},
    filetype: {type: String, required: true},
    source: {type: Buffer, required: true},
});

module.exports = mongoose.model("media", mediaSchema);