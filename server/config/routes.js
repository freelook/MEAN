module.exports = function(app){
	app.get('/partials/:partialPath', function(req, res) {
		res.render('partials/' + req.params.partialPath);
	});
	app.get('/app/:partialPath', function(req, res) {
		res.sendfile('app/' + req.params.partialPath);
	});
	app.get('*', function(req, res) {
		res.render('index');
		console.log(req.locale);
	});
};
