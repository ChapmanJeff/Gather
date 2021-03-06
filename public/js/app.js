var app = angular.module('gather', ['ngRoute', 'ui.bootstrap', 'urlWhitelist']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/js/login.html',
		})
		.when('/home', {
			templateUrl: '/js/templates/home/home.html',
			controller: 'homeCtrl'
		})
		.when('/collections', {
			templateUrl: '/js/templates/collections/collections.html',
			controller: 'collectionsCtrl'
			// resolve: {
			// 	populateCollection: function($route, mainService) {
			// 		return mainService.populateCollection()
			// 	}
			// }
		})
		.when('/collections/:id/:name', {
			templateUrl: '/js/templates/collections/collect.html',
			controller: 'collectCtrl',
			resolve: {
				populateCollection: function ($route, mainService) {
					return mainService.populateCollection($route.current.params.name);
				}
			}
		})
		.otherwise('/');

});

