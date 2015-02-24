var app = angular.module('gather');

app.controller('mainCtrl', function ($scope, mainService) {


$scope.fullData = function () {
	mainService.allMedia().then(function(res) {
		$scope.allMedia = res;
		$scope.gif = true;
	});
}

$scope.quickMedia = function () {
	mainService.quickMedia().then(function(res) {
		console.log(res);
		$scope.allMedia = res;
	});
}

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
	console.log($scope.colName)
	mainService.collectionPost(colName);
	$scope.colName = '';
	console.log($scope.colName)
	$scope.collectionInfo();
}

$scope.profileInfo();
$scope.quickMedia();
$scope.collectionNameInfo();
$scope.fullData();

})