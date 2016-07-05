"use strict";
var dbhandler = require("../controllers/dbHandler.js");
var handler = new dbhandler();

module.exports = function (app, appurl) {

	app.route("/")
		.get(function (req, res) {
			res.sendFile(process.cwd()+"/public/index.html");
		});
		
	app.route("/new/:id(*)")
		.get(function(req, res){
			handler.createUrl(req, res, appurl);
		});

	app.route("/:id")
		.get(function (req, res) {
			handler.getUrl(req, res, appurl);
		});

};
