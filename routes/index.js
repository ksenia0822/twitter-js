var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())


router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true  } );
});

router.get('stylesheets/style.css', function(req,res) {
	res.sendFile('../public/stylesheets/style.css');
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by ', name, tweets: list,showForm: false } );
});

router.get('/tweets/:id', function(req, res) {
  var uniqueID = parseInt(req.params.id);
  //console.log("unique ID is ",uniqueID);
  var tweet = tweetBank.find( { unique_id: uniqueID } );
  // console.log("tweet is",tweet,"and tweet length is",tweet.length);
  res.render('index', { title: 'Single Tweet', tweets: tweet });
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  console.log('name is: ', name, 'text is: ', text)
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;