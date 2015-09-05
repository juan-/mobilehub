var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twilio = require('twilio');
var bodyParser = require('body-parser');
var client = new twilio.RestClient('AC1778dd02a7617de146d209cbea72b9a4', '6b5698ad3a3b6340fccf563cf1824566');

var numArray = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, response) {
        var twiml = new twilio.TwimlResponse();
	    twiml.message('Sent!');
	    response.type('text/xml');
	    // Render the TwiML response as XML
	    response.send(twiml.toString());
	    
	    message = req.body.Body.toLowerCase().replace(" ","");
	    if(message == 'subscribe'){
	    	numArray.push(req.body.From);
	    } else if (message == 'un-subscribe'){
	    	var index = array.indexOf(req.body.From);
	    	if (index > -1) {
	    		array.splice(index, 1);
	    	};
	    } else {
	 	    io.emit('message', {from: req.body.From, message:req.body.Body});	    
	    }
	   
});


io.on('connection', function(socket){
  socket.on('message', function(msg){
    var i;
    
    io.emit('message', msg);

    for(i=0;i<numArray.length;i++){
    	client.sendSms({
    	    to: numArray[i],
    	    from:'6095573056',
    	    body: msg.from+": "+msg.message
    	}, function(error, message) {
    	    if (!error) {
    	        console.log('Success! The SID for this SMS message is:');
    	        console.log(message.sid);
    	        console.log('Message sent on:');
    	        console.log(message.dateCreated);
    	    } else {
    	        console.log('Oops! There was an error.');
    	    }
    	});
    }

  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening');
});
