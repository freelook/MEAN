var http = require('http');

exports.authenticate = function(req, res, next) {
	http.get('http://api.vk.com/method/likes.getList?type=sitepage&owner_id=3520312&extended=1&page_url=dev.freelook.info/vk?time=' +
			req.query.time,
		function(VKRes) {
			var data;
			VKRes.setEncoding('utf8');
			res.setHeader('Content-Type', 'text/plain;charset=utf-8');
			VKRes.on('data', function(d) {
				if (data) {
					data += d;
				} else {
					data = d;
				}
			});
			VKRes.on('end', function() {
				try {
					var VKuser,
						VKresponse = JSON.parse(data);
					if (VKresponse && VKresponse.response) {
						var response = VKresponse.response;
						if (response.items.length === 1) {
							VKuser = VKresponse.response.items[0];
							res.cookie('usr', VKuser, {httpOnly: true})
								.send({
									success:true
								});
						} else {
							res.end();
						}
					}
				} catch (err) {
					res.end();
					console.log(err);
				}
			});
		}).on('error', function(err) {
			res.end();
			console.log("Got error: " + err.message);
		});

};

exports.requiresApiLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(403);
		res.end();
	} else {
		next();
	}
};

exports.requiresRole = function(role) {
	return function(req, res, next) {
		if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
			res.status(403);
			res.end();
		} else {
			next();
		}
	}
};