define(['angularAMD'], function(angularAMD) {
	angular.module("app.controllers", []).controller("navCtrl", ["$scope", function($scope) {
//Todo nav
		console.info('nav');
	}]).controller('appCtrl', function($scope, socket) {
		console.info('appCtrl');
	});
});
