define(['angularAMD', 'angularRoute', 'angularResource', 'socket.io'],
	function(angularAMD, angularRoute, angularResource, io) {
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

		app.factory('socket', function($rootScope) {
			var socket = io.connect();
			return {
				on: function(eventName, callback) {
					socket.on(eventName, function() {
						var args = arguments;
						$rootScope.$apply(function() {
							callback.apply(socket, args);
						});
					});
				},
				emit: function(eventName, data, callback) {
					socket.emit(eventName, data, function() {
						var args = arguments;
						$rootScope.$apply(function() {
							if (callback) {
								callback.apply(socket, args);
							}
						});
					})
				}
			};
		});


		angularAMD.bootstrap(app);

		return app;
	});