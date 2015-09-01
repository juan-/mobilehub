var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = require('twilio')('AC2b5e8aa4e79fa1cb79bc1fed04c5a926', '253d025879c7aa207751243448bf8f4c');

app.configure(function () {
    /* Configure your express app... */
    app.use(express.urlencoded());
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/twiml', function(req, res) {
    if (twilio.validateExpressRequest(req, '253d025879c7aa207751243448bf8f4c')) {
        var resp = new twilio.TwimlResponse();
        resp.say('express sez - hello twilio!');

        res.type('text/xml');
        res.send(resp.toString());
    }
    else {
        res.send('you are not twilio.  Buzz off.');
    }
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening');
});
