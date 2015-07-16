module.exports = function (app) {
    app.post('/auth', function (req, res) {
    	console.log('1563');
    	res.send('yes');
        // if(req.body.login == 'admin' && req.body.pass == 'admin'){
        // 	req.session.login = 'admin';
        // 	res.redirect('/game',{login:'admin'});
        // }
    });
};