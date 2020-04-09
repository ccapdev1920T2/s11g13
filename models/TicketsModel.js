// import module `mongoose`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketsSchema= new mongoose.Schema({
	_id: Schema.Types.ObjectId, //ticketID
    showID: { type: Schema.Types.ObjectId, ref: 'shows' }, //foreign key to ShowModel, this also links to MovieModel which has the movie title
    userID: { type: Schema.Types.ObjectId, ref: 'users' }, //foreign key to UsersModel
    transID: { type: Schema.Types.ObjectId, ref: 'transactions' }, //foreign key to TransactionsModel
    status: { type: String, required: true}, //can only be "booked" and "bought". booked will be in Cart bought will be in tickets
    seats: {type: Array, required: true}, //ex. ["1D", "4C", "4D"]
    totalPrice: {type: Number, required: true}, //total price.
});

module.exports = mongoose.model("tickets", ticketsSchema);