exports.routConfig =  function(req, res) {
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
			default:
				source = 'main';
				break;
		}

		res.render(source, {
			l: require('../locale/' + ln),
			bootstrappedUser: req.user,
			source: source
		});
	};
