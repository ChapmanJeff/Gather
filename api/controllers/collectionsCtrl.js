var Collection = require('../models/collections');

module.exports = {

	post: function (req, res) {
		Collection.findOne({user: req.user._id}, function(err, doc) {
			if (err) {
				return res.status(500).json(err).end();
			}
			if (doc) {
				doc.collectionNames.push(req.body);
				doc.save();
				res.status(200).json(doc);
			}
			if (!doc) {
				var newCollection = new Collection();
				newCollection.collectionNames.push(req.body);
				newCollection.user = req.user._id;
				newCollection.save(function(err, collection) {
					if (err) {
						return res.status(500).json(err);
					}
					return res.json(collection);
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
		Collection.find({user: req.user._id}).exec().then(function(collections) {
			return res.json(collections);
		});
	},

	update: function (req, res) {
		Collection.update({_id: req.params.id}, req.body).exec().then(function(collections) {
			return res.status(200).json(collections);
		})
	},

	delete: function (req, res) {
		Collection.remove({user: req.user._id, name: req.params.id}, function (err) {
			if (err) {
				res.status(500).json(err);
			}
		})
	}

}
