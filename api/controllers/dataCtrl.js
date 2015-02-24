var request = require('request');
var q = require('q');
var tagsCtrl = require('./tagsCtrl');

module.exports = {

	// userHash: function(req, res) {
	// 	request.get('https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access, function (err, response, body) {
	//     if (err) {
	//       res.status(500).json(err);
	//     }
	//     var info = JSON.parse(body);
	//     console.log('!!!!!!!!!!!!====== ', info.data[1].tags.length)

	//     var tags = function () {
	//     	var a = [];
	//     	// a.push({pagination: info.pagination})
	// 	    for (var i = 0; i < info.data.length; i++) {
	// 	    	for (key in info.data[i]) {
	// 	    		console.log(key)
	// 	    		// if (info.data[i].tags[j] === 'devmountain') {
	// 	    		if (key === 'tags') {
	// 	    			console.log(key.length, 'Nowwwwwww')
	// 						for (var j = 0; j < key.length; j++) {
	// 							// console.log(key.[j], 'This now')
	// 							if (info.data[i].tags[j] === 'thefoodandthehat'){
	// 								a.push(info.data[i]);
	// 							}
	// 						}
	// 					}
	// 	    	}
	// 			}
	// 			req.body = {
	// 			tagId: 'cool', //req.body
	// 			url: a[0].images
	// 			}
	// 			tagsCtrl.post(req, res);
	// 			return a;
	// 		}
	// 		var tagged = tags();
	// 		console.log(tagged);

	// 		// tagsCtrl.post({
	// 		// 	tagId: 'thefoodandthehat', //req.body
	// 		// 	url: tagged.images
	// 		// })
	    
	//     // res.status(200).json(tagged);
	//   })
	// },

	quickMedia: function (req, res) {
		// request.get('https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access, function (err, response, body) {
		// 	if(err) {
		// 		res.status(500).json(err);
		// 	}
		// 	else {
		// 		var theData = JSON.parse(body);
		// 		var a = theData.data;
		// 		res.status(200).json(a);
		// 	}
		// })
		var a = [];
		var url;
		function closure(){
			var count = 0;
			// console.log(count);
			// console.log(1)
			return function(max_id){
				// console.log(2)
				var maxId = max_id;
				// console.log(maxId);
				// console.log(max_id)
				if(!maxId){
					// console.log("url 1")
					url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access;
				} else {
					// console.log("url 2")
					url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access + maxId;
				};
				request.get(url, function (err, response, body){
					var theRealResponse = JSON.parse(body)
					a = a.concat(theRealResponse.data);
					// console.log(duhresponse)
					// console.log(maxId)
					// console.log(3)
					count++;
					if(err) {
						// console.log(4);
						return res.status(500).json(err)
					} else if(count < 3 && theRealResponse.pagination.next_max_id){
						// console.log(theRealResponse.pagination.next_max_id)
						// console.log(5)
						getMedia("&max_id=" + theRealResponse.pagination.next_max_id);
					} else {
						// console.log(6)
						return res.status(200).json(a);
					}
				})
			}
		}
		var getMedia = closure();
		getMedia();
	},


//Tyler's Code ################
// allMedia: function(req, res){
//   images = []
//   var url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access
//   return (function getData(max_id){
//     !max_id && (url += maxId);
//     //should this be request or req? You have request so I'll keep it that way
//     request.get(url, function(err, response, body){
//       if(err){
//         return res.status(500).json(err);
//       }

//       var data = JSON.parse(body);
//       images = images.concat(data.json);

//       if(data.pagination.next_max_id){
//         getData("&max_id=" + data.pagination.next_max_id);
//       } else {
//         return res.status(200).json(images);
//       }
//     })
//   })();
// },

//End Tyler's code########



	allMedia: function (req, res) {
		var a = [];
		var url;
		function closure(){
			var count = 0;
			// console.log(count);
			// console.log(1)
			return function(max_id){
				// console.log(2)
				var maxId = max_id;
				// console.log(maxId);
				// console.log(max_id)
				if(!maxId){
					// console.log("url 1")
					url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access;
				} else {
					// console.log("url 2")
					url = 'https://api.instagram.com/v1/users/' + req.user.instagramId + '/media/recent?access_token=' + req.user.access + maxId;
				};
				request.get(url, function (err, response, body){
					var theRealResponse = JSON.parse(body)
					a = a.concat(theRealResponse.data);
					// console.log(duhresponse)
					// console.log(maxId)
					// console.log(3)
					count++;
					if(err) {
						// console.log(4);
						return res.status(500).json(err)
					} else if(theRealResponse.pagination.next_max_id){
						// console.log(theRealResponse.pagination.next_max_id)
						// console.log(5)
						getMedia("&max_id=" + theRealResponse.pagination.next_max_id);
					} else {
						// console.log(6)
						return res.status(200).json(a);
					}
				})
			}
		}
		var getMedia = closure();
		getMedia();
},

		saveData: function (req, res) {

		}


}