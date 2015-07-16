//boot/express.js
var config = require("nconf");
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
// var favicon = require('express-favicon');

var logger = require('morgan');
var bodyParser = require('body-parser');
 
module.exports = function (app) {
    app.set('port', config.get("server:port"));
    app.set('views', path.join(__dirname + "/..", 'views'));
    app.set('view engine', 'jade');

    // app.use(favicon(__dirname + '/../public/favicon.ico'));
 
    var sessionOptions = config.get("session");
    if ('production' == app.get('env')) {
      var MemcachedStore = require('connect-memcached')(express);
      sessionOptions.store = new MemcachedStore();
    }
 
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname + "/..", 'public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session(sessionOptions));

 };