define(['angularAMD', 'angularRoute', 'angularResource', 'core/controllers/controllers', 'socket.io'],
	function(angularAMD, angularRoute, angularResource, controllers, io) {
		'use strict';
// To Правильные зависимости(app.)
		var app = angular.module('app', ['ngResource', 'ngRoute', 'app.controllers']);

		app.config(function($routeProvider, $locationProvider) {
			$locationProvider.html5Mode(true);
			$routeProvider
				.when('/',
					angularAMD.route({
						templateUrl: '/partials/main/view',
						controller: 'viewCtrl',
						controllerUrl: 'core/controllers/viewCtrl'
					}))
				.when('/vk',
					angularAMD.route({
						templateUrl: '/partials/main/main',
						controller: 'mainCtrl',
						controllerUrl: 'core/controllers/mainCtrl'
					}))
				.when('/fb',
					angularAMD.route({
						templateUrl: '/partials/main/main',
						controller: 'mainCtrl',
						controllerUrl: 'core/controllers/mainCtrl'
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