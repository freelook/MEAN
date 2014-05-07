var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	username: {
		type: String,
		required: '{PATH} is required!',
		unique: true
	},
	salt: {type: String, required: true},
	hashed_pwd: {type: String, required: true},
	roles: [String]
});
userSchema.methods = {
	authenticate: function(passwordToMatch) {
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function(role) {
		return this.roles.indexOf(role) > -1;
	}
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
	User.find({}).exec(function(err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, '1');
			User.create({
				firstName: 'Free',
				lastName: 'Look',
				username: 'freelook',
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			});
		}
	})
};

exports.createDefaultUsers = createDefaultUsers;
