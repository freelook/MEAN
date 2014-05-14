var controller = require('../controllers/main'),
	auth = require('./auth'),
	http = require('http');

module.exports = function(app) {
	app.get('/partials/*', function(req, res) {
		res.render('../../app/views/' + req.params);
	});
	app.get('/demo/:partialPath', function(req, res) {
		res.sendfile('demo/' + req.params.partialPath);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
		res.end();
	});

	app.get('/api/*', function(req, res) {
		http.get('http://api.vk.com/method/likes.getList?type=sitepage&owner_id=3520312&extended=1&page_url='
			+ req.query.page,
			function(VKRes) {
				var data;
				VKRes.setEncoding('utf8');
				res.setHeader('Content-Type', 'text/plain;charset=utf-8');
				VKRes.pipe(res);
				VKRes.on('data', function(d) {
					if (data) {
						data += d;
					} else {
						data = d;
					}
				});
				VKRes.on('end', function() {
					try {
						var VKuser = JSON.parse(data);
						console.log(VKuser.response.items[0].uid);
					} catch (e) {
						console.log(e);
					}
				});
			}).on('error', function(e) {
				console.log("Got error: " + e.message);
				res.send(e);
			})
	});

	app.get('*', controller.routConfig);
};
