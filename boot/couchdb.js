// var nodeCouchDB = require("node-couchdb");
// var couch = new nodeCouchDB("localhost", 5984);
var cradle = require('cradle');
var db = new(cradle.Connection)('localhost', 5984, {
      auth: { username: 'ligmar', password: 'v81wiZM2lqiWsKkP' }
  }).database('ligmar');


exports.couch = db;