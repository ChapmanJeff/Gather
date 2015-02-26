var app = angular.module('gather');

app.controller('mainCtrl', function ($scope, mainService, $timeout) {

$scope.updateOrCreateMedia = function () {
	console.log('hey')
	mainService.updateOrCreateMedia().then(function(res) {
		console.log('hi again')
		console.log(res);
		$timeout(function() {
        $scope.dbMedia()
        console.log('dbMedia with timeout fired')
    },  65000);
	})
}

$timeout(function() {
        $scope.updateOrCreateMedia()
        console.log('updateOrCreateMedia with timeout fired')
    },  10000);


$scope.dbMedia = function () {
	mainService.dbMedia().then(function(res) {
		$scope.allMedia = res.data;
		$scope.gif = true;
		console.log($scope.allMedia)
		// $scope.allMedia = res.data.data;
	})
}



// $scope.populateCollection = function (name) {
// 	mainService.populateCollection(name).then(function(res) {
// 		console.log(res);
// 	})
// }

//##########################################

// $scope.fullData = function () {
// 	mainService.allMedia().then(function(res) {
// 		$scope.allMedia = res;
// 		$scope.gif = true;
// 	});
// }

// $scope.quickMedia = function () {
// 	mainService.quickMedia().then(function(res) {
// 		console.log(res);
// 		$scope.allMedia = res;
// 	});
// }

$scope.profileInfo = function () {
	mainService.profileInfo().then(function(res) {
		console.log(res);
		$scope.profile = res;
	})
}

$scope.collectionNameInfo = function () {
	mainService.collectionNameInfo().then(function(res) {
		$scope.collections = res;
	})
}

$scope.collectionPost = function (colName) {
	mainService.collectionPost(colName);
	document.getElementById("collectionInput").reset();
	console.log($scope.colName)
	$scope.collectionNameInfo();
}

$scope.dbMedia();
$scope.profileInfo();
// $scope.quickMedia();
// $scope.fullData();
$scope.collectionNameInfo();

})