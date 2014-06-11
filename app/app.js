define(['angularAMD', 'angularRoute', 'angularResource', 'core/controllers/controllers', 'socket.io'],
	function(angularAMD, angularRoute, angularResource, controllers, io) {
		'use strict';

		var app = angular.module('app', ['ngResource', 'ngRoute', 'app.controllers']);
		app.config(function($routeProvider, $locationProvider) {
			var configAMD = angularAMD.constructor;
			configAMD.viewPath = 'views/main/';
			configAMD.ctrlPath = 'core/controllers/';
			$locationProvider.html5Mode(true);
			$routeProvider
				.when('/:view',
				angularAMD.route({
					templateUrl: function(config) {
						var view = 'view';
						if (config && config.view) {
							view = config.view;
						}
						return configAMD.viewPath + view;
					},
					controllerUrl: true
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