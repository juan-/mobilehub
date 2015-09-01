var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twilio = require('twilio')('AC1778dd02a7617de146d209cbea72b9a4', '6b5698ad3a3b6340fccf563cf1824566');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.post('/twiml', function(req, res) {
        console.log(req);
        console.log(req.Body);
        
});


io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening');
});
