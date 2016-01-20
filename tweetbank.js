var _ = require('lodash');

var data = [];

function add (name, text) {
  data.push({ name: name, text: text , unique_id: (data.length + 1)});
}

function list () {
  return _.cloneDeep(data);
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

module.exports = { add: add, list: list, find: find };


var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Shanna', 'Charlotte', 'Scott', 'Ayana', 'Omri', 'Gabriel', 'Joe'];
  var fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['red', 'blue', 'green', 'yellow', 'pink', 'orange', 'purple', 'grey'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (var i = 0; i < 5; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

module.exports.add("Shanna Gregory","Welcome to Grace Hopper Academy!");
module.exports.add("Grace Hopper","I love to code");

console.log(data);
//console.log("results of find",module.exports.find({name:'Grace Hopper'}));
console.log("results of finding by ID",module.exports.find({unique_id: 4})[0].text);

//console.log("results of list",module.exports.list());
