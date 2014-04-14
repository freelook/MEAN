var express = require('express'),
	stylus = require('stylus')
mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
	return stylus(str).set('filename', path);
}

app.configure(function() {
	app.set('views', __dirname + '/server/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(stylus.middleware(
		{
			src: __dirname + '/public',
			compile: compile
		}
	));
	app.use(express.static(__dirname + '/public'));
});

if (env === 'development') {
	mongoose.connect('mongodb://localhost/mean');
} else {
	mongoose.connect('mongodb://mean:mean@ds045897.mongolab.com:45897/mean');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Messages = mongoose.model('Messages', messageSchema);
var mongoMsg;
Messages.findOne().exec(function(err, msgDoc) {
	mongoMsg = msgDoc.message;
});

app.get('/partials/:partialPath', function(req, res) {
	res.render('partials/' + req.params.partialPath);
});
app.get('/app/:partialPath', function(req, res) {
	res.sendfile('app/' + req.params.partialPath);
});
app.get('*', function(req, res) {
	res.render('index', {
		mongoMsg: mongoMsg
	});
});

var port = process.env.PORT || 3333;
app.listen(port);

console.log('Listening on port ' + port + ' ...');