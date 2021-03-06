define(['app', 'core/js/vk'], function(app, vk) {
	'use strict';
	app.register.controller('viewCtrl', function($rootScope, $scope, $http, $window, socket, $routeParams, $location) {
		$rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
			$location.path('/');
			$location.replace();
		});

		console.info('mainCtrl:' + $routeParams.name);
		$scope.lcz = lcz;
		$scope.inButtonDisable = false;
		$scope.inButtonShow = false;
		$scope.signin = function() {
			if($scope.date) {
				$http.post('/login?time=' + $scope.date).then(function(response) {
					if (response.data.success) {
						$window.location = '/';
					} else {
						// TODO: Show msg err
					}
				});
			}
		};
		socket.emit('getDate');
		socket.on('setDate', function(date) {
			$scope.date = date;
			VK.init({apiId: 3520312, onlyWidgets: true});
			var loc = location.host + '/' + date;
			VK.Widgets.Like("vk", {type: "button", height: 24, pageUrl: loc});
			$scope.inButtonShow = true;
		});

		try {
			if (VK && VK.Observer && VK.Observer.subscribe) {
				VK.Observer.subscribe('widgets.like.liked', function() {
					console.log('in');
					$scope.inButtonDisable = true;
					// TODO: display vk
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
