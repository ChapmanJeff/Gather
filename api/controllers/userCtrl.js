var User = require('../models/user');
var q = require('q');

module.exports = {

	updateOrCreate: function(user) {
		var dfd = q.defer();
		User.findOne({ instagramId: user.id }, function(err, doc) {
			if (err) {
				return dfd.reject(err);
			}
			if (doc) {
				User.findByIdAndUpdate(doc._id, {
					instagramId: user.id,
					username: user.username,
					bio: user._json.data.bio,
					profilePic: user._json.data.profile_picture,
					name: user.displayName,
					posts: user._json.data.counts.media,
					followed_by: user._json.data.counts.followed_by,
					follows: user._json.data.counts.follows,
					access: user.access
				}, function (err, doc) {
					if (err) {
						return dfd.reject(err);
					}
					else {
						dfd.resolve(doc);
					}
				})
			}
			else {
				User.create({
					instagramId: user.id,
					username: user.username,
					bio: user._json.data.bio,
					profilePic: user._json.data.profile_picture,
					name: user.displayName,
					posts: user._json.data.counts.media,
					followed_by: user._json.data.counts.followed_by,
					follows: user._json.data.counts.follows,
					access: user.access
				}, function (err, doc) {
					if (err) {
						return dfd.reject(err);
					}
					else {
						dfd.resolve(doc);
					}
				})
			}
		})
		return dfd.promise;
	},

	profile: function(req, res) {
		User.findOne({instagramId: req.user.instagramId}, function (err, doc) {
			if (err) {
				return res.status(500).res.json(err).end();
			}
			if (doc) {
				doc.access = 'null';
			}
			return res.json(doc);
		})
	}

}
