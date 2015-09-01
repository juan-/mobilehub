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
        var twiml = new twilio.TwimlResponse();

        twiml.message('Hi!  Thanks for checking out my app!');

        res.type('text/xml');
        res.send(twiml.toString());
        console.log(req['Body']);
});
app.get('/twiml', function(req, res) {
        var twiml = new twilio.TwimlResponse();

        twiml.message('Hi!  Thanks for checking out my app!');

        res.type('text/xml');
        res.send(twiml.toString());
        console.log(req['Body']);
});


io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening');
});
