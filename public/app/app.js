angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', { templateUrl: '/partials/main/main', controller: 'mainCtrl'})
		.when('/vk', { templateUrl: '/partials/main/main', controller: 'mainCtrl'})
		.when('/fb', { templateUrl: '/partials/main/main', controller: 'mainCtrl'})
});

angular.module('app').controller('mainCtrl', function($scope) {
	$scope.myVar = "Hello Angular";
});