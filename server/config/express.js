var express = require('express'),
	stylus = require('stylus'),
	locale = require('express-locale');

module.exports = function(app, config) {
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}

	app.configure(function() {
		app.set('views', config.rootPath + '/server/views');
		app.set('view engine', 'jade');
		app.use(express.favicon('./app/favicon.ico'));
		app.use(express.logger(config.logger));
		app.use(locale());
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.session({secret: 'freelook'}));
		app.use(stylus.middleware(
			{
				src: config.rootPath + '/app',
				compile: compile
			}
		));
		app.use(require('../middleware/HTTPError'));
		app.use(app.router);
		app.use(express.static(config.rootPath + '/app'));
		app.use( require('../middleware/ErrorHandler')(app));
	});
};