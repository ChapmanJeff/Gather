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
				var newCollection = new Collection(); //put req.body in new Collection(req.body)
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
		console.log(0, req.params.id)
		Collection.findOne({user: req.user._id}, function(err, doc) {
			console.log(0.5, doc)
			if (err) {
				res.status(500).json(err);
			}
			for (var i = doc.collectionNames.length -1; i >= 0; i--) {
				console.log(12, doc.collectionNames[i]._id);
				console.log(21, req.params.id);
				if (doc.collectionNames[i]._id == req.params.id) {
					console.log(2, doc.collectionNames[i].id)
					doc.collectionNames.splice(i, 1);
					console.log(3, doc.collectionNames[i])
				}
				else {
					console.log('Could not find match')
				}
			}
			console.log(4)
			doc.save();
			console.log(5, doc)
			res.status(200).json(doc);
		})
	}
	// 	console.log(1, req.params.id)
	// 	Collection.remove({_id: req.params.id}, function (err) {
	// 		console.log(2)
	// 		if (err) {
	// 			console.log(4)
	// 			res.status(500).json(err);
	// 		}
	// 		console.log(3)
	// 		res.status(200).json(req.params.id)
	// 	})
	// }

}
