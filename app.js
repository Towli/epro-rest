var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var index = require('./routes/index');
var patients = require('./routes/patients');
var procedures = require('./routes/procedures');
var surveys = require('./routes/surveys');
var Procedure = require('./models/procedure');
var app = express();

// connect to mongodb
var config = require('./config.json')[app.get('env')];
mongoose.connect(config.mongoURI);
mongoose.Promise = Promise;

// test connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to mongo database localhost:27017/epro');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// fetch scripts from node_modules directory
app.use('/js', express.static(__dirname + '/node_modules/survey-jquery/'));    

app.use(index);
app.use(patients);
app.use(procedures);
app.use(surveys);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
