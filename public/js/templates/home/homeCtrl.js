var app = angular.module('gather');

app.controller('homeCtrl', function (homeService, $scope, mainService) {

// ###########Moved info to MainCtrl #############

// $scope.getData = function () {
// 	homeService.listData().then(function(res) {
// 		console.log(res);
// 	})
// }
// $scope.getData();


// console.log(quickMedia)
// $scope.allMedia = quickMedia;

// $scope.fullData = function () {
// 	mainService.allMedia().then(function(res) {
// 		$scope.allMedia = res;
// 		$scope.gif = true;
// 	});
// }
// $scope.fullData();


// console.log(quickMedia);      // remember to inject quickMedia
// $scope.quickMedia = quickMedia;

// console.log(profileInfo);
// $scope.profile = profileInfo;

// ###########End of Moved info to MainCtrl #############

// $scope.hashSearch = function() {
// 	console.log('Here');
// 	a = [];
// 	for (var i = 0; i < $scope.allMedia.length; i++) {
// 		for (key in $scope.allMedia[i]) {
// 			if (key === 'tags') {
// 				for (var j = 0; j < key.length; j++) {
// 					if ($scope.allMedia[i].tags[j] === $scope.hashInfo){
// 						a.push($scope.allMedia[i]);
// 					}
// 				}
// 			}
// 		}
// 	}
// 	console.log(a);
// 	$scope.searchResult =  a;
// }




});

