var HttpError = require('../utilities/error').HttpError;

exports.routConfig = function(req, res, next) {
	var ln = 'en',
		source;
	if (req.locale && req.locale.code) {
		ln = req.locale.code.split('_')[0].toLowerCase();
		ln = (ln === 'ru') ? ln : 'en';
	}

	switch (req.params.toString()) {
		case '/vk':
			source = 'vk';
			break;
		case '/fb':
			source = 'fb';
			break;
		case '/':
			if(req.cookies.usr) {
				source = 'app';
			} else {
				source = 'main';
			}
			break;
	}
	if (source) {
		res.render(source, {
			lcz: require('../locale/' + ln),
			bootstrappedUser: req.user,
			source: source
		});
	} else {
		next();
	}
};

exports.auth = function(req, res, next) {
	if (!req.cookies.usr) {
		return next(new HttpError(401, "Вы не авторизованы"));
	}

	next();
};