var express = require( 'express' );
var swig = require( 'swig' );
var app = express(); // creates an instance of an express application


app.engine('html', swig.renderFile)
app.set('view engine','html')
app.set('views', __dirname + '/views')

// ??? Caching Do we need both lines?
//app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use('/', function(req,res, next) {
	console.log('you asked for:' + req.method + req.path)
	console.log('Response status code is: ' + res.statusCode);
	next();
})


app.use('/special', function(req,res, next) {
	console.log('You reached the special area: ' + req.method + req.path);
	console.log('Response status code is: ' + res.statusCode);
	next();
})

app.get('/', function(req, res, next) {
	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people} );

})

app.get('/news', function(req, res, next) {
	res.send("Here is a good news");

})




app.listen(3000, function() {
	console.log("Listening to the port 3000");
});