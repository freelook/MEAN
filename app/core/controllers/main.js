define(['app', 'core/js/vk'], function(app, vk) {
	'use strict';

	app.register.controller('main', function($scope) {
		$scope.myVar = "Hello Angular";
	});

	VK.init({apiId: 3520312, onlyWidgets: true});
	VK.Widgets.Like("vk", {type: "button", height: 24});

	try {
		if (VK && VK.Observer && VK.Observer.subscribe) {
			VK.Observer.subscribe('widgets.like.liked', function() {
				// todo liked
				console.log('liked');
			});
			VK.Observer.subscribe('widgets.like.unliked', function() {
				// todo unliked
				console.log('unliked');
			});
		}
	} catch (e) {
		console.error(e.message);
	}
});
