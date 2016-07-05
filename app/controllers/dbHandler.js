"use strict";

var ShortUrl = require("../models/urls.js");

function DbHandler () {
	
	this.getAllUrl = function(){
		return ShortUrl.find();
	};

	this.getUrl = function(req, res, appurl){
		var searchfor = appurl+req.params.id;
		ShortUrl.find({"short_url": searchfor}, function(err, result){
			if(err){
				return console.error(err);
			} else {
				if(result[0] !== undefined){
					res.redirect(301, result[0].original_url);
				} else{
					res.json({"error": "Not valid url"});
				}
			}
		});
	};
	
	this.createUrl = function(req, res, appurl){
		if(/^https?:\/\/www\..+\.\w+\/?/.test(req.params.id)){
			var query = this.getAllUrl();
			query.exec(function(err, results){
				if(err){
					return console.error(err);
				} else{
					var newUrl = ShortUrl({
						original_url: req.params.id,
    					short_url: appurl+results.length
					});
					newUrl.save(function (err, newurl) {
						if (err){
							return console.error(err);
						} else{
							res.json({"original_url": newurl["original_url"],
								"short_url": newurl["short_url"]
							});
						}
					});
				}
			});
		} else {
			res.json({"error": "Wrong url format."});
		}
	};

}

module.exports = DbHandler;
