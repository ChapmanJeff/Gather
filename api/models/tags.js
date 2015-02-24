var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
	tag: [{
		tagId: {type: String, required: true},
		url: [{type: String, required: true}]
	}],
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Tag', tagSchema);