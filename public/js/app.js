var app = angular.module('gather', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/js/login.html',
		})
		.when('/home', {
			templateUrl: '/js/templates/home/home.html',
			controller: 'homeCtrl'
	//Moved to Main CTRL: #############################
			// resolve: {
			// 	// allMedia: function (mainService) {
			// 	// 	return mainService.allMedia();
			// 	// },
			// 	// quickMedia: function (mainService) {
			// 	// 	return mainService.quickMedia();
			// 	// },
			// 	profileInfo: function (mainService) {
			// 		return mainService.profileInfo();
			// 	}
			// }
			//End of Content Moved to Main CTRL: #############################
		})
		.when('/collections', {
			templateUrl: '/js/templates/collections/collections.html',
			controller: 'collectionsCtrl'
		})
		.when('/collections/:id', {
			templateUrl: '/js/templates/collections/collect.html',
			controller: 'collectionsCtrl',
			resolve: {
				sortedInfo: function ($route, mainService) {
					return mainService.sortedInfo($route.current.params.id);
				}
			}
		})
		.otherwise('/');




});