module.exports = function(server) {
	var io = require('socket.io').listen(server);
	io.set('origins', '*');

	io.sockets.on('connection', function (socket) {
		socket.on('msg', function (msg) {
			console.log(msg);
		});
	});

};
