require.config({

	baseUrl: "/",

	paths: {
		'angular': 'vendor/angular/angular',
		'angularRoute': 'vendor/angular-route/angular-route',
		'angularResource': 'vendor/angular-resource/angular-resource',
		'angularAMD': 'vendor/angularAMD/angularAMD',
		'ngload': 'vendor/angularAMD/ngload',
		'socket.io': 'socket.io/socket.io'
	},

	shim: {
		'angularAMD': ['angular'],
		'angularRoute': ['angular'],
		'angularResource': ['angular']
	},

	deps: ['app']
});
