// ??? In part 6.2 SIDE NOTE: notice how our app.js script depends on numerous modules (Express, Morgan, Swig, etc.). Why we don't require morgan?

var express = require( 'express' );
var socketio = require('socket.io');
var app = express(); 

var swig = require( 'swig' );

var routes = require('./routes/');

// Before implementing Socket.io
// app.use('/', routes);
// After implementing Socket.io


app.engine('html', swig.renderFile)
app.set('view engine','html')
app.set('views', __dirname + '/views')

swig.setDefaults({ cache: false });

app.use(express.static('public'));

var server = app.listen(3000, function() {
	console.log("Listening to the port 3000");
});

var io = socketio.listen(server);

app.use( '/', routes(io) );