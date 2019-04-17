// Listen on port 3636
var io = require('socket.io')(3002);
 
io.sockets.on('connection', function (socket) {
 
    // Broadcast a user's message to everyone else in the room
    socket.on('send', function (data) {
    	console.log(data);
        io.sockets.in(socket.room).emit('message', data);
    });


    socket.on('adduser', function(username, room){
    	console.log(username);
    	console.log(room);
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = room;
		// add the client's username to the global list
		// usernames[username] = username;
		// send client to room 1
		socket.join(room);
		// echo to client they've connected
		// socket.emit('updatechat', 'SERVER', 'you have connected to room1');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
		// socket.emit('updaterooms', rooms, 'room1');
	});
 
});