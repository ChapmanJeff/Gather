var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
		attribution: String,
		videos: {
			low_bandwidth: {
				url: String,
				width: Number,
				height: Number
			},
			standard_resolution: {
				url: String,
				width: Number,
				height: Number
			},
			low_resolution: {
				url: String,
				width: Number,
				height: Number
			}
		},
		tags: [{type: String, index: true}],
		type: String,
		location: String,
		comments: {
			count: Number,
			data: [{
				created_time: String,
				text: String,
				from: {
					username: String,
					profile_picture: String,
					id: String,
					full_name: String
				},
				id: String
			}]
		},
		filter: String,
		created_time: String,
		link: String,
		likes: {
			count: Number,
			data: [{
				username: String,
				profile_picture: String,
				id: String,
				full_name: String
			}]
		},
		images: {
			low_resolution: {
				url: String,
				width: Number,
				height: Number
			},
			thumbnail: {
				url: String,
				width: Number,
				height: Number
			},
			standard_resolution: {
				url: String,
				width: Number,
				height: Number
			}
		},
		users_in_photo: [{
			position: {
				y: Number,
				x: Number
			},
			user: {
				username: String,
				profile_picture: String,
				id: String,
				full_name: String
			}
		}],
		caption: {
			created_time: String,
			text: String,
			from: {
				username: String,
				profile_picture: String,
				id: String,
				full_name: String
			},
			id: String
		},
		user_has_liked: Boolean,
		id: String,
		user: {
			username: String,
			website: String,
			profile_picture: String,
			full_name: String,
			bio: String,
			id: String
		},
		mongoID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Media', mediaSchema);

