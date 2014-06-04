define(['app', 'core/js/vk'], function(app, vk) {
	'use strict';

	app.register.controller('mainCtrl', function($scope, $http, $window, socket) {
		console.info('mainCtrl');
		// TODO: get date from server
		//var date = (new Date()).getTime();
		var date = '1401868310976';
		$scope.inButtonDisable = false;
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
					$scope.inButtonDisable = true;
					$scope.signin();
					socket.emit('msg', {
						message: 'in'
					});
				});
				VK.Observer.subscribe('widgets.like.unliked', function() {
					$scope.inButtonDisable = false;
					console.log('un');
				});
			}
		} catch (e) {
			console.error(e.message);
		}
	});
});
