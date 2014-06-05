module.exports = function(server, config) {
	var io = require('socket.io').listen(server);
	io.set('origins', '*:*');

	io.sockets.on('connection', function (socket) {
		socket.on('msg', function (msg) {
			console.log(msg);
		});
		socket.on('getDate', function(){
			socket.emit('setDate', config.date || (new Date()).getTime());
		});
	});

};
