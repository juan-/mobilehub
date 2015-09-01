var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twilio = require('twilio');
var bodyParser = require('body-parser');
var client = new twilio.RestClient('AC1778dd02a7617de146d209cbea72b9a4', '6b5698ad3a3b6340fccf563cf1824566');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, response) {
        var twiml = new twilio.TwimlResponse();
	    twiml.message('Sent!');
	    console.log(req.body);
	    
	    // Render the TwiML response as XML
	    response.type('text/xml');
	    response.send(twiml.toString());

});


io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening');
});
