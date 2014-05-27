define(['app'], function(app) {
	'use strict';
	app.register.controller('appCtrl', function($scope, socket) {
		$scope.isSpecificPage = function() {
			return false;
		}
	});
});
