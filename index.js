var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twilio = require('twilio')('AC1778dd02a7617de146d209cbea72b9a4', '6b5698ad3a3b6340fccf563cf1824566');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*twilio.sendSms({
    to:'6095169870',
    from:'6095573056',
    body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});*/

app.post('/twiml', function(req, res) {
        var resp = new twilio.TwimlResponse();
        resp.say('express sez - hello twilio!');

        res.type('text/xml');
        res.send(resp.toString());
});
app.get('/twiml', function(req, res) {
        var resp = new twilio.TwimlResponse();
        resp.say('express sez - hello twilio!');
        res.type('text/xml');
        res.send(resp.toString());
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening');
});
