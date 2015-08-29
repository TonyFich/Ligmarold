var db = require("../../boot/couchdb").ligmar,
	db_s = require("../../boot/couchdb").ligmar_settings;

module.exports = function (app) {
	app.get('/game', function (req, res) {
		if(req.session.id_login != undefined){
		if(req.session.id_login != undefined){
			res.render('game/index',{login:req.session.login});
			}
			else
				res.redirect('/game/characters');
			}
		else
			res.redirect('/');
	});

	app.post('/game/enter', function (req, res) {
		if(req.session.id_login != undefined){
			if (!req.body) return res.sendStatus(400);
			//Получание данных персонажа
			db.get(req.body.character_id, function (err, doc) {
				req.session.id_character = doc.id;
				res.send('ok');
			});
		}
		else
			res.redirect('/');
	});

	app.get('/game/characters', function (req, res) {
		if(req.session.id_login != undefined){
			db.get(req.session.id_login, function (err, doc) {
				var user = {login:doc.login,
					gold: doc.gold,
					wallet: doc.wallet};
				db.get(doc.characters, function (err, doc) {
					user.characters = doc;
					res.render('game/enter/characters',{login:user.login});
				});
			});
		}
		else
			res.redirect('/');
	});

	app.get('/game/new_character', function (req, res) {
		if(req.session.id_login != undefined)
			res.render('game/enter/new_character',{login:user.login});
		else
			res.redirect('/');
	});
	app.post('/game/new_character', function (req, res) {
		if(req.session.id_login != undefined){
			if (!req.body) return res.sendStatus(400);

			//Должна быть проверка уникальности имени персонажа
			db_s.get(req.body.class, function (err, doc) {
				if(doc && (req.body.gender == 1 || req.body.gender == 0)){
					db.save({
						name: req.body.name,
						user: req.session.id_login,
						class: req.body.class,
						gender: req.body.gender,
						exp: 0,
						exp_was: 0,
						exp_need: 75,
						level: 1,
						str_self: 5,
						dex_self: 5,
						vit_self: 5,
						int_self: 5,
						str: 5,
						dex: 5,
						vit: 5,
						int: 5,
						health: doc.health_per_vit*5,
						health_max: doc.health_per_vit*5,
						health_reg: doc.health_reg,
						mana: doc.mana_per_int*5,
						mana_max: doc.mana_per_int*5,
						mana_reg: doc.mana_reg,
						dmg_min: doc.dmg_min,
						dmg_max: doc.dmg_max,
						dmg_type: doc.dmg_type,
						dmg_mag: 0,
						dmg_strike: 2.05,
						strike: 0.01,
						aspeed: doc.aspeed,
						def: doc.def,
						resist: doc.resist,
						accur: doc.accur_per_dex*5,
						dodge: doc.dodge_per_dex*5,
						free_char: 0,
						cbth: doc.cbth,
						loc: "Зион",
						bag: 20,
						hp_b: 0,
						mp_b: 0,
						skills: [],
						death: 0
					}, function (err, answer) {
						if(answer.ok) {
							//Связываем персонажа с аккаунтом
							db.get(req.session.id_login, function (err, doc) {
								var characters = doc.characters;
								characters[characters.lenght] = answer.id;
								db.merge(req.session.id_login, {characters: characters}, function (err, res) {});
							});
						}
						res.send('ok');
					});
				}
				else return res.sendStatus(400);
			});
		}
		else
			res.redirect('/');
	});
};