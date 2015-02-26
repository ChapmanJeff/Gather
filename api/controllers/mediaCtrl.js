var Media = require('../models/media');
// var dataCtrl = require('./api/controllers/dataCtrl');
var q = require('q');
var request = require('request');

module.exports = {

	updateOrCreate: function(req, res) {
		console.log(req.user._id);
		var dfd = q.defer();
		Media.findOne({mongoID: req.user._id}, function(err, doc) {
			if (err) {
				return dfd.reject(err);
			}
			if (doc) {
				Media.remove({mongoID: req.user._id}, function(err) {
					if (err) {
						res.status(500).json(err);
					}
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
									var newA = a.map(function(item, index){
										item.mongoID = req.user._id;
										return item;
									});
									newA.forEach(function(item, index){
										Media.update({ id: item.id }, item, { upsert: true }, function (err, result, raw) {
											if (err) {
												return res.status(500).json(err);
											}
											console.log(result)
										});
									})
								}
							})
						}
					}
					var getMedia = closure();
					getMedia();
				})
				res.json('done')
			}
			else {
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
									var newA = a.map(function(item, index){
										item.mongoID = req.user._id;
										return item;
									});
									Media.create(newA, function (err, results) {
										if (err) {
											return res.status(500).json(err);
										}
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



	// updateOrCreate: function(req, res) {
	// 	console.log(req.user._id);
	// 	var dfd = q.defer();
	// 	Media.findOne({mongoID: req.user._id}, function(err, doc) {
	// 		console.log(1);
	// 		if (err) {
	// 			console.log(2);
	// 			return dfd.reject(err);
	// 		}
	// 		if (doc) {
	// 			console.log(3);
	// 			Media.remove({mongoID: req.user._id}, function(err) {
	// 				if (err) {
	// 					res.status(500).json(err);
	// 				}
	// 				console.log(4);
	// 				var a = [];
	// 				var url;
	// 				function closure(){
	// 					var count = 0;
	// 					return function(max_id){
	// 						var maxId = max_id;
	// 						if(!maxId){
	// 							url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access;
	// 						} else {
	// 							url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access + maxId;
	// 						};
	// 						request.get(url, function (err, response, body){
	// 							var theRealResponse = JSON.parse(body)
	// 							a = a.concat(theRealResponse.data);
	// 							count++;
	// 							if(err) {
	// 								return res.status(500).json(err)
	// 							} else if(theRealResponse.pagination.next_max_id){
	// 								getMedia("&max_id=" + theRealResponse.pagination.next_max_id);
	// 							} else {
	// 								var newA = a.map(function(item, index){
	// 									item.mongoID = req.user._id;
	// 									return item;
	// 								});
	// 								console.log(5);
	// 								Media.create(newA, function (err, results) {
	// 									if (err) {
	// 										return res.status(500).json(err);
	// 									}
	// 									console.log(6);
	// 									return res.json(results);
	// 								});
	// 							}
	// 						})
	// 					}
	// 				}
	// 				var getMedia = closure();
	// 				getMedia();
	// 			})
	// 		}
	// 		else {
	// 			console.log(7);
	// 				var a = [];
	// 				var url;
	// 				function closure(){
	// 					var count = 0;
	// 					return function(max_id){
	// 						var maxId = max_id;
	// 						if(!maxId){
	// 							url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access;
	// 						} else {
	// 							url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access + maxId;
	// 						};
	// 						request.get(url, function (err, response, body){
	// 							var theRealResponse = JSON.parse(body)
	// 							a = a.concat(theRealResponse.data);
	// 							count++;
	// 							if(err) {
	// 								return res.status(500).json(err)
	// 							} else if(theRealResponse.pagination.next_max_id){
	// 								getMedia("&max_id=" + theRealResponse.pagination.next_max_id);
	// 							} else {
	// 								var newA = a.map(function(item, index){
	// 									item.mongoID = req.user._id;
	// 									return item;
	// 								});
	// 								Media.create(newA, function (err, results) {
	// 									if (err) {
	// 										return res.status(500).json(err);
	// 									}
	// 									console.log(8);
	// 									return res.json(results);
	// 								});
	// 							}
	// 						})
	// 					}
	// 				}
	// 				var getMedia = closure();
	// 				getMedia();
	// 		}
	// 	})
	// 	return dfd.promise;
	// },

	list: function (req, res) {
		Media.find({mongoID: req.user._id}, null, {sort: {created_time: 'desc'}}).exec().then(function(media) {
			console.log('AAAAAAAA', media)
			return res.json(media);
		});
	},

	sortByTag: function (req, res) {
		Media.find({mongoID: req.user._id, tags: req.params.tag}, null, {sort: {created_time: 'desc'}}).exec().then(function(tags) {
			return res.status(200).json(tags);
		})
	}


}
