var Tag = require('../models/tags');

module.exports = {

	post: function (req, res) {
		Tag.findOne({user: req.user._id}, function(err, doc) {
			if (err) {
				return res.status(500).json(err).end();
			}
			if (doc) {
				var flag;;
				for (var i = 0; i < doc.tag.length; i++) {
					flag = false;
					if (doc.tag[i].tagId === req.body.tagId) {
						doc.tag[i].url.push(req.body.url);
						flag = true;
						break;
					}
				}
				if (!flag) {
						doc.tag.push(req.body);
				}
				doc.save();
				res.status(200).json(doc);
			}
			if (!doc) {
				var newTag = new Tag(req.body);
				newTag.user = req.user._id;
				newTag.save(function(err, tag) {
					if (err) {
						return res.status(500).json(err);
					}
					return res.json(tag);
				})
			}
		})
	},
	// 	Tag.findOneAndUpdate({user: req.user._id}, req.body, {upsert: true}, function(err, tag) {
	// 		if (err) {
	// 			return res.status(500).json(err).end();
	// 		}
	// 		return res.json(tag);
	// 	})
	// },

	list: function (req, res) {
		Tag.find({user: req.user._id}).exec().then(function(tags) {
			return res.json(tags);
		});
	},

	update: function (req, res) {
		Tag.update({_id: req.params.id}, req.body).exec(function(err, tag) {
			return res.status(200).end();
		})
	}

}
