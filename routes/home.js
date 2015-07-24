var db = require("../boot/couchdb").couch;
var crypto = require('crypto');

var hash = crypto.createHash('sha512');
hash.update('123124');
console.log(hash.digest('hex'));

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.post('/auth', function (req, res) {
    	if (!req.body) return res.sendStatus(400);
		db.view('users/UsersLogin',{key:req.body.login}, function (err, doc) {
			if(doc[0]){
				console.log(crypto.createHash('sha512').update(req.body.password).digest('hex'));
				if(doc[0].value == req.body.password){
		    		req.session.login = req.body.login;
					res.send('yes'); 
					return;
				}
			}
			res.send('no');
		});
    });

    app.get('/reg', function (req, res) {
        res.render('reg');
    });
    app.post('/reg', function (req, res) {
    	if (!req.body) return res.sendStatus(400);
		db.view('users/UsersReg',{key:req.body.login}, function (err, doc) {
			if(doc[0]){
				res.send('login');
			}
			else{
				db.view('users/UsersReg',{value:req.body.email}, function (err, doc) {
					console.log(doc);
					if(doc[0]){
						res.send('email');
					}
				});
			}
		});
    });
};