define(['app', 'core/js/vk'], function(app, vk) {
	'use strict';

	app.register.controller('mainCtrl', function($scope, $http, $window, socket) {
		// TODO: get date from server
		var date = (new Date()).getTime();
		$scope.lcz = lcz;

		$scope.signin = function() {
			$http.post('/login?time=' + date).then(function(response) {
				if (response.data.success) {
					$window.location = '/';
				}
			});
		};

		VK.init({apiId: 3520312, onlyWidgets: true});
		var loc = location.href.replace(/#.*$/, '') + '?time=' + date;
		VK.Widgets.Like("vk", {type: "button", height: 24, pageUrl: loc});

		try {
			if (VK && VK.Observer && VK.Observer.subscribe) {
				VK.Observer.subscribe('widgets.like.liked', function() {
					console.log('in');
					$scope.signin();
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
