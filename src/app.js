var express = require('express');
var Model = require('objection').Model;
var Knex = require('knex');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ConnectRoles = require('connect-roles');
var flash = require('connect-flash');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');

var roles = new ConnectRoles();
var app = express();

// set up DB connection
var config = require('../knexfile.js');
Model.knex(Knex(config.development));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(flash());
app.use(roles.middleware());

app.use(express.static(path.join(__dirname, '../../public')));
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var data = {
        status: 404,
        message: 'Not Found',
        url: req.url
    };
    res.status(404)
        .send(data)
        .end();
});

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//module.exports = io;
module.exports = passport;
module.exports = app;