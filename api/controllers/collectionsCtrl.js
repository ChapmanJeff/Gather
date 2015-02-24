var Collection = require('../models/collections');

module.exports = {

	post: function (req, res) {
		console.log('STARRRRRTTTTT', req.body)
		// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!req.body is this ', req.user);
		Collection.findOne({user: req.user._id}, function(err, doc) {
			// console.log('*******************************',req.body.tagId, doc.tag[0].tagId, doc.tag[0].url, req.body.url, req.body);
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
				console.log(newCollection);
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
	}

}
