var mongoose = require('mongoose');

var collectionsSchema = mongoose.Schema({
	collectionNames: [{
		name: {type: String, required: true}
	}],
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Collection', collectionsSchema);