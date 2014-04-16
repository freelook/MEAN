var mongoose = require('mongoose');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('freelook db opened');
	});
	var messageSchema = mongoose.Schema({message: String});
	var Messages = mongoose.model('Messages', messageSchema);
	var mongoMsg;
	Messages.findOne().exec(function(err, msgDoc) {
		mongoMsg = msgDoc.message;
	});
};
