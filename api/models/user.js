var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	instagramId: {type: Number, unique: true, required: true},
	username: {type: String, required: true, unique: true},
	access: {type: String, required: true},
	bio: String,
	profilePic: {type: String},
	name: String,
	posts: Number,
	followed_by: Number,
	follows: Number
});

module.exports = mongoose.model('User', userSchema);