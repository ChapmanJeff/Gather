var app = angular.module('gather');

app.controller('homeCtrl', function (homeService, $scope, mainService) {

var counter = 0;

$scope.setMedia = function (media) {
	console.log(media)
	console.log(222, media);
	$scope.index = Number(media);
	console.log($scope.index)
	counter = 0;
}

$scope.nextPage = function () {
	if($scope.index === 15) {
		counter += 1;
		$scope.pageChanged($scope.currentPage + counter)
		$scope.index = 0;
		console.log(counter);
	}
	else {
		$scope.index = $scope.index + 1;
		console.log($scope.index);
	}
}

$scope.backPage = function () {
	if($scope.index === 0) {
		counter -= 1;
		$scope.pageChanged($scope.currentPage - counter)
		$scope.index = 15;
		console.log(counter);
	}
	else {
		$scope.index = $scope.index - 1;
		console.log($scope.index);
	}
}


// var updateMedia = function () {
// 	mainService.updateMedia();
// }

// updateMedia();




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

