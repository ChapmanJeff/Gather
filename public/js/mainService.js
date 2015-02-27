var app = angular.module('gather');

app.service('mainService', function ($http, $q) {

	// this.updateMedia = function () {
	// 	return $http({
	// 		method: 'GET',
	// 		url: '/api/allMedia2'
	// 	})
	// }

	this.dbMedia = function () {
		return $http({
			method: 'GET',
			url: '/api/dbMedia'
		})
	}

	this.updateOrCreateMedia = function () {
		return $http({
			method: 'GET',
			url: '/api/updateOrCreateMedia'
		})
	}

	this.populateCollection = function (tag) {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/populateCollection/' + tag
		})
		.then(function(res) {
			console.log(res);
			var data = res;
			dfd.resolve(data);
		})
		return dfd.promise;
	}

	// this.fullData = function () {
	// 	return $http({
	// 		method: 'GET',
	// 		url: '/api/dataMedia'
	// 	})
	// }

	// this.allMedia = function () {
	// 	var dfd = $q.defer();
	// 	$http({
	// 		method: 'GET',
	// 		url: '/api/allMedia'
	// 	}).then(function(res) {
	// 		var data = res.data;
	// 		dfd.resolve(data);
	// 	})
	// 	return dfd.promise
	// };

	// this.quickMedia = function () {
	// 	var dfd = $q.defer();
	// 	$http({
	// 		method: 'GET',
	// 		url: '/api/quickMedia'
	// 	}).then(function(res) {
	// 		var data = res.data;
	// 		console.log(data);
	// 		dfd.resolve(data);
	// 	})
	// 	return dfd.promise
	// };


	this.profileInfo = function () {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/profile'
		})
		.then(function(res) {
			var prof = res.data;
			dfd.resolve(prof);
		})
		return dfd.promise;
	}

	this.updatedProfile = function () {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/updatedProfile'
		})
		.then(function(res) {
			console.log(res)
			var prof = res.data;
			dfd.resolve(prof);
		})
		return dfd.promise;
	}

	this.collectionNameInfo = function () {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/collections'
		}).then(function(res) {
			var data = res.data[0].collectionNames;
			dfd.resolve(data);
		})
		return dfd.promise;
	}

	this.collectionPost = function (CollectionName) {
		console.log(CollectionName);
		return $http({
			method: 'POST',
			url: '/api/collections',
			data: {name: CollectionName}
		})
	}

// this.sortedInfo = function (id) {
// 	var dfd = $q.defer();
// 		$http({
// 			method: 'GET',
// 			url: '/api/allMedia'
// 		}).then(function(res) {
// 			var data = res.data;
// 			a = [];
// 			for (var i = 0; i < data.length; i++) {
// 				for (key in data[i]) {
// 					if (key === 'tags') {
// 						for (var j = 0; j < key.length; j++) {
// 							if (data[i].tags[j] === id){
// 								a.push(data[i]);
// 							}
// 						}
// 					}
// 				}
// 			}
// 			console.log(a);
// 			dfd.resolve(a);
// 		})
// 		return dfd.promise
// }


});
