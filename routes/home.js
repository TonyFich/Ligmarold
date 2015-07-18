module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/reg', function (req, res) {
        res.render('reg');
    });
    app.get('/game/index', function (req, res) {
        res.render('game/index');
    });
};