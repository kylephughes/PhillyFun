
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import * as httperrors from "http-errors";
import {routes} from "./routes/index";
import * as mongoose from "mongoose";

class App {
    public app: express.Application;
    //public routePrv  : Routes = new Routes();
    // public mongoUrl: string = 'mongodb://localhost/CRMdb';
    public mongoUrl: string = 'mongodb://localhost:27017/PhillyFun';

    constructor() {
        this.app = express();
        this.config();
        //this.routePrv.routes(this.app);
        this.mongoSetup();
        this.routes();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
      //  this.app.use("/api", this.routePrv.router);

        //var angular = express.Router();
        //sends all requires to angular so it can handle the routing
        //angular.get('*',function(req,res,next) {
        //  res.sendFile(path.join(__dirname + '/public/index.html'));
        //});
        //this.app.use('*',angular);
      // catch 404 and forward to error handler


    }

    private routes(): void {
        let router = express.Router();

        router.get('/tt', (req: express.Request, res: express.Response) => {
          res.send("efreferf34f34f");
        });
        this.app.use(cookieParser());
          console.log("about to the router");
        this.app.use('/api', routes);
        console.log("set the router");
        this.app.use(function(req, res, next) {
          next(httperrors(404));
        });

        // error handler
        this.app.use(function(err, req, res, next) {
          // set locals, only providing error in development
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};

          // render the error page
          res.status(err.status || 500);
          res.render('error');
        });
  }

    private mongoSetup(): void{
        //mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

}

export default new App().app;
/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var http = require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var happyHourController = require('./controllers/happyhour_controller');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27017/PhillyFun");
//Get the  default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
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


app.use('/api/happyhour/', happyHourController);
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
*/
