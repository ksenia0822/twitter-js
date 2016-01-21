var express = require('express');
var router = express.Router();
// could we use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

var socketio = require('socket.io');

module.exports = function (io) {

  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true  } );
  });

  //??? Part 7.5 I don't really understand what this router does. Do we still need to use it if we use express.static?
  // router.get('stylesheets/style.css', function(req,res) {
  // 	res.sendFile('../public/stylesheets/style.css');
  // });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { title: 'Twitter.js - Posts by ' + name, namevalue: name, tweets: list, showForm: true } );
  });

  router.get('/tweets/:id', function(req, res) {
    var uniqueID = parseInt(req.params.id);
    var tweet = tweetBank.find( { unique_id: uniqueID } );
    res.render('index', { title: 'Single Tweet', tweets: tweet });
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');

    io.sockets.emit('new_tweet', { name: name, text: text });

  });

  return router;
};












