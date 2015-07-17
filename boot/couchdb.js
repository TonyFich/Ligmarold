// var nodeCouchDB = require("node-couchdb");
// var couch = new nodeCouchDB("localhost", 5984);
var cradle = require('cradle');
var db = new(cradle.Connection)().database('ligmar');


exports.couch = db;