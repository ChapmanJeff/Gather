var app = angular.module('gather');

app.controller('mainCtrl', function ($scope, mainService, $timeout) {

$scope.updateOrCreateMedia = function () {
	console.log('hey')
	mainService.updateOrCreateMedia().then(function(res) {
		console.log('hi again')
		console.log(res);
		$scope.dbMedia()
		$scope.updatedProfile();
		$scope.gif = true;
	})
}


$scope.dbMedia = function () {
	mainService.dbMedia().then(function(res) {
		$scope.allMedia = res.data;
		$scope.carousel();
		$scope.profileInfo();
		// $scope.gif = true;
		console.log($scope.allMedia)
	})
}

$scope.carousel = function () {
 $scope.myInterval = 0;
  var slides = $scope.slides = $scope.allMedia;
}


  // $scope.myInterval = 5000;
  // var slides = $scope.slides = [];
  // $scope.addSlide = function() {
  //   var newWidth = 600 + slides.length + 1;
  //   slides.push({
  //     image: 'http://placekitten.com/' + newWidth + '/300',
  //     text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
  //       ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
  //   });
  // };
  // for (var i=0; i<4; i++) {
  //   $scope.addSlide();
  // }



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

$scope.updatedProfile = function () {
	mainService.updatedProfile().then(function(res) {
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
	document.getElementById("collectionInput").reset();
	mainService.collectionPost(colName).then(function(res) {
		console.log($scope.colName)
		$scope.collectionNameInfo();
	})
}

$scope.dbMedia();
$scope.profileInfo();
$scope.collectionNameInfo();
$scope.updateOrCreateMedia();



})