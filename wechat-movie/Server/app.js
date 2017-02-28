const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('underscore');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const config = require('./config/config.js'); 
const cookieParser = require('cookie-parser');
const port = config.port;
const app = express()

mongoose.Promise = require('bluebird');

mongoose.connect(config.mongodbURL)

// 使用中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session({
  secret: 'ljl',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
  	url: config.mongodbURL,
  	collection: 'session'
  })
}))

// app.use(function(req, res) {
// 	const _user = req.session.user;
// 	console.log(req)
// 	if (_user) {
// 		req.locals.user = _user;
// 	}
// 	return next();
// });


app.locals.moment=require("moment")
app.listen(port)

require('./routes/route')(app);

app.use(function(req, res, next) {
	res.status(404);
	try {
		res.json('not found');
	} catch(e) {
		console.error('404 set header after send');
	} 
});

app.use(function(err, req, res, next) {
	if(!err) {return next()}
	res.status(500);
	try {
		return res.json(err.message || 'server error');
	} catch(e) {
		console.error('500 set header after send');
	}
});




