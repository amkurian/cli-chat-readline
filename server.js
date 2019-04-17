// Listen on port 3636
var io = require('socket.io')(3002);
 
io.sockets.on('connection', function (socket) {
 
    // Broadcast a user's message to everyone else in the room
    socket.on('send', function (data) {
    	console.log(data);
        io.sockets.emit('message', data);
    });
 
});