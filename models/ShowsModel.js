// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowsSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
	movieID: { type: Schema.Types.ObjectId, ref: 'movies' },
    //showID: {type: String},
    dayOfWeek: Number,
    date: {type: Date, required: true},
    time: {type: String, required: true}
});

module.exports = mongoose.model("shows", ShowsSchema)