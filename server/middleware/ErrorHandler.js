var HttpError = require('../utilities/error').HttpError,
	express = require('express');

module.exports = function(app) {
	return function(err, req, res, next) {
		if (typeof err == 'number') {
			err = new HttpError(err);
		}

		if (err instanceof HttpError) {
			res.sendHttpError(err);
		} else {
			if (app.get('env') == 'development') {
				express.errorHandler()(err, req, res, next);
			} else {
				console.error(err);
				err = new HttpError(500);
				res.sendHttpError(err);
			}
		}
	}
};
