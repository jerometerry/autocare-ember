var express = require('express');
var path = path = require('path');
var ejs = require('ejs');

var app = express();

app.use(express.static(path.join(__dirname, 'public/ember-app')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
	res.sendFile("index.html", { root: "./public/ember-app/" });
});

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
