var User = require('../models/user');
var q = require('q');
var request = require('request');

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
	},

	update: function (req, res) {
		var dfd = q.defer();
		User.findOne({ _id: req.user._id }, function(err, doc) {
			if (err) {
				return dfd.reject(err);
			}
			if (doc) {
				request.get('https://api.instagram.com/v1/users/'+ req.user.instagramId +'/?access_token=' + req.user.access, function (err, response, body) {
					if (err) {
						rest.status(500).json(err);
					}
					var user = JSON.parse(body)

					User.findByIdAndUpdate(doc._id, {
						instagramId: user.data.id,
						username: user.data.username,
						bio: user.data.bio,
						profilePic: user.data.profile_picture,
						name: user.data.full_name,
						posts: user.data.counts.media,
						followed_by: user.data.counts.followed_by,
						follows: user.data.counts.follows,
					}, function (err, doc) {
						if (err) {
							return dfd.reject(err);
						}
						else {
							console.log(doc)
							res.status(200).json(doc);
							dfd.resolve(doc);
						}
					})
				})
			}
		})
		return dfd.promise;
	}

}
