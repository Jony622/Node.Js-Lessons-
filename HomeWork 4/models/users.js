const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
	id: String,
	username: String,
	startdate: Number,
	enddate: Number,
	spenttime: Number,
	role: [String],
	todo: [],
	createdAt: {
		type: Date,
		default: Date.now
	}
}),
User = mongoose.model('User', userSchema);

module.exports = User;