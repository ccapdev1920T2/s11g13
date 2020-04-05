// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatsSchema= new mongoose.Schema({
	_id: Schema.Types.ObjectId, //seatID
    showID: { type: Schema.Types.ObjectId, ref: 'shows' }, //foreign key to ShowModel
    seatNum: {type: String, required: true},
    seatPrice: {type: Number},
    isTaken: {type: Boolean, required: true},
});

module.exports = mongoose.model("seats", seatsSchema);