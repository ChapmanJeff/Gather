var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
	data: [{
		attribution: String,
		videos: {
			low_resolution: {
				url: String,
				width: Number,
				height: Number
			}
			low_bandwidth: {
				url: String,
				width: Number,
				heightL Number
			}
			standard_resolution: {
				url: String,
				width: Number,
				height: Number
			}
		}
		tags: [String],
		type: String,
		location
	}],

	tag: [{
		tagId: {type: String, required: true},
		url: [{type: String, required: true}]
	}],
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Media', mediaSchema);