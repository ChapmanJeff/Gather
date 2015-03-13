var Media = require('../models/media');
var userCtrl = require('../controllers/userCtrl');
// var dataCtrl = require('./api/controllers/dataCtrl');
var q = require('q');
var request = require('request');

module.exports = {

	// updateOrCreate: function (req, res) {
	// 	Media.remove({mongoID: req.user._id}, function(err) {
	// 				if (err) {
	// 					res.status(500).json(err);
	// 				}
	// 			});
	// },

	updateOrCreate: function(req, res) {
		console.log(req.user._id);
		var dfd = q.defer();
		Media.findOne({mongoID: req.user._id}, function(err, doc) {
			console.log(1, doc);
			if (err) {
				console.log(2);
				return dfd.reject(err);
			}
			if (doc) {
				console.log(3);
				// Media.findOne({mongoID: req.user._id}, function(err) {
				// 	if (err) {
				// 		res.status(500).json(err);
				// 	}
				(function(){
					console.log(4);
					var a = [];
					var url;
					function closure(){
						console.log(4.1)
						var count = 0;
						return function(max_id){
							console.log(4.2)
							var maxId = max_id;
							if(!maxId){
								url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access;
							} else {
								url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access + maxId;
							};
							request.get(url, function (err, response, body){
								console.log(4.3)
								var theRealResponse = JSON.parse(body)
								a = a.concat(theRealResponse.data);
								count++;
								if(err) {
									return res.status(500).json(err)
								} else if(theRealResponse.pagination.next_max_id){
									getMedia("&max_id=" + theRealResponse.pagination.next_max_id);
								} else {
									var newA = a.map(function(item, index){
										item.mongoID = req.user._id;
										return item;
									});
									console.log(5);
									newA.forEach(function(item, index){
										Media.update({ id: item.id }, item, { upsert: true }, function (err, response) {
											if (err) {
												res.status(500).json(err);
											}
											console.log(response, item.id)
										});
									})
									console.log('send')
										res.json('done')
								}
							})
						}
					}
					var getMedia = closure();
					getMedia();
					console.log('End of IF')
				})()
				// })
			}
			else {
				console.log(7);
					var a = [];
					var url;
					function closure(){
						var count = 0;
						return function(max_id){
							var maxId = max_id;
							if(!maxId){
								url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access;
							} else {
								url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access + maxId;
							};
							request.get(url, function (err, response, body){
								var theRealResponse = JSON.parse(body)
								a = a.concat(theRealResponse.data);
								count++;
								if(err) {
									return res.status(500).json(err)
								} else if(theRealResponse.pagination.next_max_id){
									getMedia("&max_id=" + theRealResponse.pagination.next_max_id);
								} else {
									console.log(2.1)
									var newA = a.map(function(item, index){
										item.mongoID = req.user._id;
										return item;
									});
									console.log(2.2)
									Media.create(newA, function (err, results) {
										if (err) {
											return res.status(500).json(err);
										}
										console.log(8);
										return res.json(results);
									});
								}
							})
						}
					}
					var getMedia = closure();
					getMedia();
			}
			dfd.resolve(doc)
		})
		return dfd.promise;
	},

	list: function (req, res) {
		Media.find({mongoID: req.user._id}, null, {sort: {created_time: 'desc'}}).exec().then(function(media) {
			console.log('Listing Function')
			return res.json(media);
		});
	},

	sortByTag: function (req, res) {
		Media.find({mongoID: req.user._id, tags: req.params.tag}, null, {sort: {created_time: 'desc'}}).exec().then(function(tags) {
			return res.status(200).json(tags);
		})
	}


}
