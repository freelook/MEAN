require.config({

	baseUrl: "/",

	paths: {
		'angular': 'vendor/angular/angular',
		'angular-route': 'vendor/angular-route/angular-route',
		'angular-resource': 'vendor/angular-resource/angular-resource',
		'angularAMD': 'vendor/angularAMD/angularAMD',
		'ngload': 'vendor/angularAMD/ngload'
	},

	shim: {
		'angularAMD': ['angular'],
		'angular-route': ['angular'],
		'angular-resource': ['angular']
	},

	deps: ['app']
});
