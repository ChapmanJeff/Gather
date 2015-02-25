var app = angular.module('gather');

app.controller('collectCtrl', function ($scope, mainService, populateCollection) {

$scope.populateCollection = populateCollection;
console.log($scope.populateCollection);

});