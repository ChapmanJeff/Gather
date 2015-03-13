var app = angular.module('gather');

app.controller('collectCtrl', function ($scope, mainService, populateCollection, $route) {

$scope.title = $route.current.params.name;
$scope.id = $route.current.params.id;

$scope.populateCollection = populateCollection.data;
console.log($scope.populateCollection);
console.log($scope.populateCollection.tags);

$scope.setMedia = function (media) {
	console.log(222, media);
	$scope.index = media;
}

$scope.nextPage = function () {
	$scope.index = $scope.index + 1;
	console.log($scope.index);
}

$scope.backPage = function () {
	$scope.index = $scope.index - 1;
	console.log($scope.index);
}



});