var db = require("../boot/couchdb").couch;
var crypto = require('crypto');
var request = require('request');
var config = require("nconf");

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.post('/auth', function (req, res) {
    	if (!req.body) return res.sendStatus(400);
		db.view('users/UsersLogin',{key:req.body.login}, function (err, doc) {
			if(doc[0]){
				if(doc[0].value == crypto.createHash('sha512').update(req.body.password).digest('hex')){
		    		req.session.id_login = doc[0].id;
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
		db.view('users/UsersLogin',{key:req.body.email}, function (err, doc) {
			if(doc[0]){
				res.send('email');
			}
			else{
				//Проверка капчи
				request.post('https://www.google.com/recaptcha/api/siteverify', {form:{secret:config.get("recaptcha"),response:req.body.captcha}}, function optionalCallback(err, httpResponse, body) {
					if (err) {
						return;
					}
					var answer = JSON.parse(body);
					if(answer.success == true){
						req.session.req.session.id_login = req.body.email;
						//Создание записи в БД
						db.save({
							box: 30,
							gold: 0,
							login: req.body.email,
							password: crypto.createHash('sha512').update(req.body.password).digest('hex'),
							type: "user",
							wallet: 0
						}, function (err, res) {
							// Handle response
						});
						res.send('ok');
					}
					else{
						res.send('captcha');
					}
				});
			}
		});
    });
};