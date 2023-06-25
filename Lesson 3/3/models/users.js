const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
	username: String,
	password: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
}),
User = mongoose.model('User', userSchema);

module.exports = User;