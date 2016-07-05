"use strict";
require("dotenv").config();
var express = require("express");
var routes = require("./app/routes/index.js");
var mongoose = require("mongoose");

var app = express();

app.use("/public", express.static(process.cwd() + "/public"));

mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("Successfully connected to MongoDB");
});

routes(app, process.env.APP_URL);

app.listen(process.env["PORT"]);
console.log("server is running on "+process.env["PORT"]);