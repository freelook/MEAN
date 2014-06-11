var controllers = require('../controllers/main'),
	passport = require('./passport'),
	http = require('http');

module.exports = function(app) {
	app.get('/views/*', function(req, res) {
		res.render('../../app/views/' + req.params);
	});

	app.get('/demo/*', function(req, res, next) {
		next();
	});

	app.post('/login', passport.authenticate);

	app.all('/logout', function(req, res) {
		res.clearCookie('usr');
		res.redirect('/');
	});

	app.get('/api/*', function(req, res) {
		res.end();
	});

	app.get('*', controllers.routConfig);
};
