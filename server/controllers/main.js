var HttpError = require('../utilities/error').HttpError,
	locale;

exports.routConfig = function(req, res, next) {
	var ln = 'en',
		source;
	if (req.locale && req.locale.code) {
		ln = req.locale.code.split('_')[0].toLowerCase();
		ln = (ln === 'ru') ? ln : 'en';
	}

	locale = require('../locale/' + ln);

	switch (req.params.toString()) {
		case '/view':
			switch (req.query.name) {
				case 'vk':
					source = 'vk';
					break;
				case 'fb':
					source = 'fb';
					break;
			}
			break;
		case '/':
			if (req.cookies.usr) {
				source = 'app';
			} else {
				source = 'main';
			}
			break;
	}
	if (source) {
		res.render(source, {
			lcz: locale,
			usr: req.cookies.usr,
			source: source
		});
	} else {
		next();
	}
};

exports.auth = function(req, res, next) {
	if (!req.cookies.usr) {
		if( !locale ){
			locale = require('../locale/en');
		}
		return next(new HttpError(401, locale.http['401']));
	}

	next();
};