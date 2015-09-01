var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twilio = require('twilio');
var bodyParser = require('body-parser');
var client = new twilio.RestClient('AC1778dd02a7617de146d209cbea72b9a4', '6b5698ad3a3b6340fccf563cf1824566');

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/twiml', function(req, res) {
        if (twilio.validateExpressRequest(req, '6b5698ad3a3b6340fccf563cf1824566')) {
	        var resp = new twilio.TwimlResponse();
	        resp.say('express sez - hello twilio!');
			res.setHeader('Access-Control-Allow-Origin', '*');
	        res.type('text/xml');
	        res.send(resp.toString());
	    }
	    else {
	        res.send('you are not twilio.  Buzz off.');
	    }

        /*var twiml = new twilio.TwimlResponse();
        //
        //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('content-type','text/xml');

        twiml.message('Hi!  Thanks for checking out my app!');

        res.type('text/xml');
        res.send(twiml.toString());*/
});
app.get('/twiml', function(req, res) {
        var twiml = new twilio.TwimlResponse();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('content-type','text/xml');


        twiml.message('Hi!  Thanks for checking out my app!');

        res.type('text/xml');
        res.send(twiml.toString());
});


io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening');
});
