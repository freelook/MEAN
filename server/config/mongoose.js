var mongoose = require('mongoose')
	userModel = require('../models/User');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('freelook db opened');
	});
	var messageSchema = mongoose.Schema({message: String});
	var Messages = mongoose.model('Messages', messageSchema);

	userModel.createDefaultUsers();

};
