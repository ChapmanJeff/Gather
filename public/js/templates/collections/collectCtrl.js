var app = angular.module('gather');

app.controller('collectCtrl', function ($scope, mainService, populateCollection, $route) {

$scope.title = $route.current.params.id;

$scope.populateCollection = populateCollection.data;
console.log($scope.populateCollection);

});