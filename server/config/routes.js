var controller = require('../controllers/main');
	auth = require('./auth');

module.exports = function(app){
	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/views/' + req.params);
	});
	app.get('/app/:partialPath', function(req, res) {
		res.sendfile('app/' + req.params.partialPath);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
		res.end();
	});

	app.get('*', controller.routConfig );
};
