var db = require("../../boot/couchdb").couch;

module.exports = function (app) {
    app.get('/game', function (req, res) {
        res.render('game/index',{login:req.session.login});
    }); 

    app.get('/game/characters', function (req, res) {
    	if(req.session.id_login != undefined){
			db.get(req.session.id_login, function (err, doc) {
				var user = {login:doc.login,
					gold: doc.gold,
					wallet: doc.wallet,
					characters: []}
	        	res.render('game/characters',{login:user.login});
			});
        }
        else
        	res.redirect('/');
    }); 
};