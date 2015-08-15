var cradle = require('cradle');

var db = new(cradle.Connection)('localhost', 5984, {
		auth: { username: 'ligmar', password: 'v81wiZM2lqiWsKkP' }
	}).database('ligmar');

exports.ligmar = db;


var db_s = new(cradle.Connection)('localhost', 5984, {
		auth: { username: 'ligmar', password: 'v81wiZM2lqiWsKkP' }
	}).database('ligmar_settings');

exports.ligmar_settings = db_s;