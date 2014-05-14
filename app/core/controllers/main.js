define(['app'], function(app) {
	'use strict';

	app.register.controller('main', function($scope) {
		$scope.myVar = "Hello Angular";
		console.log('Hello Angular');
	});

});
