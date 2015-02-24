var Tag = require('../models/tags');

module.exports = {

	post: function (req, res) {
		console.log('STARRRRRTTTTT', req.body)
		// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!req.body is this ', req.user);
		Tag.findOne({user: req.user._id}, function(err, doc) {
			// console.log('*******************************',req.body.tagId, doc.tag[0].tagId, doc.tag[0].url, req.body.url, req.body);
			if (err) {
				return res.status(500).json(err).end();
			}
			if (doc) {
				// console.log('JEFFFFF', doc.tag, 'JEFFFFF');
				var flag;;
				for (var i = 0; i < doc.tag.length; i++) {
					flag = false;
					// console.log("Here");
					if (doc.tag[i].tagId === req.body.tagId) {
						doc.tag[i].url.push(req.body.url);
						console.log('QQQQ', doc.tag[i].url, 'QQQQQQ');
						flag = true;
						break;
					}
				}
				if (!flag) {
					// console.log('Right here')
						doc.tag.push(req.body);
						console.log('$$$$$$$', doc.tag, '$$$$$$');
				}
				doc.save();
				res.status(200).json(doc);
			}
			if (!doc) {
				var newTag = new Tag(req.body);
				newTag.user = req.user._id;
				console.log(newTag);
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
