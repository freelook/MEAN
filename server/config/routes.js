module.exports = function(app){
	app.get('/partials/:partialPath', function(req, res) {
		res.render('partials/' + req.params.partialPath);
	});
	app.get('/app/:partialPath', function(req, res) {
		res.sendfile('app/' + req.params.partialPath);
	});
	app.get('*', function(req, res) {
		if(req.locale && req.locale.code){
		var ln = req.locale.code.split('_')[0].toLowerCase();
		ln = (ln === 'ru' || ln === 'en')? ln : 'en';
		}
		var locale = require('../locale/' + ln);
		res.render('index', locale);
		console.log();
	});
};
