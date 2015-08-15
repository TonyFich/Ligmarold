var config = require("nconf"),
	cluster = require('cluster'),
	numCPUs = require('os').cpus().length;
var express = require('express');
var app = express();

config.argv()
	.env()
	.file({ file: 'config.json' });
//boot
var boot = require('./boot/index')(app)
// routing
require('./routes/index')(app);


if (cluster.isMaster) {
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
	console.log('worker ' + worker.process.pid + ' died');
	});
} else {
	var server = app.listen(app.get('port'), function () {

		var host = server.address().address
		var port = server.address().port
		if ('development' == app.get('env')) {
			console.log('Example app listening at http://%s:%s', host, port)
		}
	})
}
