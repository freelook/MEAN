var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');

var config = {
	development: {
		db: 'mongodb://localhost/mean',
		rootPath: rootPath,
		port: process.env.PORT || 3333,
		logger: 'dev'
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://mean:mean@ds045897.mongolab.com:45897/mean',
		port: process.env.PORT || 80,
		logger: ''
	}
};
module.exports = function(env){
	return config[env];
}
