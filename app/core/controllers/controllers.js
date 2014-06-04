define(['angularAMD'], function(angularAMD) {
	angular.module("app.controllers", []).controller("navCtrl", ["$scope", function($scope) {
		console.info('nav');
	}]).controller('appCtrl', function($scope, socket) {
		console.info('appCtrl');
	}).controller('headerCtrl', function($scope, $http, $window) {
		console.info('headerCtrl');
		var user = {},
			isOpen = false;
		if (usr) {
			user = {
				name: usr.first_name + " " + usr.last_name
			};
			if (usr.uid) {
				var vkr = 'http://api.vk.com/method/users.get?user_ids=' + usr.uid + '&fields=photo_50&callback=JSON_CALLBACK';
				$http.jsonp(vkr).success(function(data){
					if(data){
						$scope.usr.img = data.response[0].photo_50;
					}
				});
			}
		} else {
			user = {
				name: 'Инкогнито'
			};
		}

		$scope.usr = user;
		$scope.openClass = '';
		$scope.topNavOpen = function() {
			$scope.openClass = isOpen ? '' : 'open';
			isOpen = !isOpen;
		};
		$scope.logout = function() {
			$http.post('/logout', {logout:true}).then(function() {
				usr = null;
				$window.location = '/';
			});
		}
	});
});
