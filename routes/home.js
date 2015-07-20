var db = require("../boot/couchdb").couch;

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/reg', function (req, res) {
        res.render('reg');
    });
    //для проверки
    app.get('/game/index', function (req, res) {
        res.render('game/index');
    });
    app.post('/auth', function (req, res) {
    	if (!req.body) return res.sendStatus(400);
    	
		db.view('users/UsersLogin',{key:req.body.login}, function (err, doc) {
			if(doc[0]){
				if(doc[0].value == req.body.password){
		    		req.session.login = req.body.login;
					res.send('yes'); 
					return;
				}
			}
			res.send('no');
		});
    });
};