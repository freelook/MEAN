define(['app', 'core/js/vk'], function(app, vk) {
	'use strict';

	app.register.controller('main', function($scope, $http, $window, socket) {
		$scope.myVar = "Hello Angular";

		$scope.signin = function() {
			$http.post('/login').then(function(response) {
				if (response.data.success) {
					$window.location = '/demo/app.html';
				}
			});
		};

		VK.init({apiId: 3520312, onlyWidgets: true});
		VK.Widgets.Like("vk", {type: "button", height: 24});

		try {
			if (VK && VK.Observer && VK.Observer.subscribe) {
				VK.Observer.subscribe('widgets.like.liked', function() {
					console.log('in');
					$scope.signin();
					// TODO: test ws
					socket.emit('msg', {
						message: 'in'
					});
					//$scope.$emit('goBack');
				});
				VK.Observer.subscribe('widgets.like.unliked', function() {
					console.log('un');
				});
			}
		} catch (e) {
			console.error(e.message);
		}
	});
});
