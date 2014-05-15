define(['angularAMD', 'angular-route', 'angular-resource'], function (angularAMD) {
	'use strict';

	var app = angular.module('app', ['ngResource', 'ngRoute']);

	app.config(function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/vk',
				angularAMD.route({
					templateUrl: '/partials/main/main',
					controller: 'main',
					controllerUrl: 'core/controllers/main'
				}))
			.when('/fb',
				angularAMD.route({
					templateUrl: '/partials/main/main',
					controller: 'main',
					controllerUrl: 'core/controllers/main'
				}))
			.otherwise({redirectTo: '/'});
	});

	angularAMD.bootstrap(app);

	return app;
});