var app = angular.module('gather');

app.controller('collectionsCtrl', function ($scope, mainService) {

// $scope.sortedInfo = sortedInfo;
// console.log(sortedInfo)

// $scope.fullData = function () {
// 	mainService.allMedia().then(function(res) {
// 		$scope.allMedia = res;
// 	});
// }

// console.log($scope.allMedia);
// 	$scope.sorter = function (hashtag) {
// 		$scope.hashSearch = function() {
// 		console.log($scope.allMedia);
// 		a = [];
// 			for (var i = 0; i < $scope.allMedia.length; i++) {
// 				for (key in $scope.allMedia[i]) {
// 					if (key === 'tags') {
// 						for (var j = 0; j < key.length; j++) {
// 							if ($scope.allMedia[i].tags[j] === hashtag){
// 								a.push($scope.allMedia[i]);
// 							}
// 						}
// 					}
// 				}
// 			}
// 			console.log(a);
// 			return  a;
// 		}
// 	};


});