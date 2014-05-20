var controllers = require('../controllers/main'),
	passport = require('./passport'),
	http = require('http');

module.exports = function(app) {
	app.get('/partials/*', function(req, res) {
		res.render('../../app/views/' + req.params);
	});
	app.get('/demo/*', controllers.auth, function(req, res, next) {
		//res.sendfile('../../app/demo/' + req.params);
		next();
	});

	app.post('/login', passport.authenticate);

	app.get('/logout', function(req, res) {
		res.clearCookie('usr');
		res.end();
	});

	app.get('/api/*', function(req, res) {
		res.end();
	});

	app.get('*', controllers.routConfig);
};
