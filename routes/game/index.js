module.exports = function (app) {
    app.get('/game', function (req, res) {
        res.render('game/index',{login:req.session.login});
    }); 

    app.get('/game/characters', function (req, res) {
    	if(req.session.login != undefined)
        	res.render('game/characters',{login:req.session.login});
        else
        	res.redirect('/');
    }); 

};