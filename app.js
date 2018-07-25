var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var http = require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27017/PhillyFun");
//Get the  default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('errror', console.error.bind(console, 'MongoDB connection error:'));
var usr = require('./models/user.js');
//var newin = new usr({firstName:"kyle",lastName:"hughes"});
////newin.save(function (err) {
  //console.log("saved");
  // saved!
//});
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', indexRouter);
var router = express.Router();
//sends all requires to angular so it can handle the routing
router.get('*',function(req,res,next) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.use('*',router);
//app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
