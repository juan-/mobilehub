var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.sockets.on('connection', function(socket){
	console.log('User Connected');
	socket.on('message', function(data) {
	  io.sockets.emit(data.for, {message: data.message, from: data.from});
	  console.log("Message from "+data.from+" to "+data.for+" was sent. "+data.from+" said "+ data.message );
	});
});

console.log("listening on port 8080.");
