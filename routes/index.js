//routes/index.js
module.exports = function (app) {
    require("./home")(app);
    require('./game/index')(app);

    app.get('/test', function (req, res) {
        res.render('index');
    });
};