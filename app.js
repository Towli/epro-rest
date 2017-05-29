const express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , mongo = require('mongodb')
  , mongoose = require('mongoose')
  , helmet = require('helmet')
  , index = require('./routes/index')
  , patients = require('./routes/patients')
  , procedures = require('./routes/procedures')
  , surveys = require('./routes/surveys')
  , mailer = require('./routes/mailer')
  , results = require('./routes/results')
  , flash = require('connect-flash')
  , session = require('express-session')
  , app = express();

// use helmet early to ensure headers are sure to be set
app.use(helmet());

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
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// flashes
app.use(cookieParser('abc'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

// fetch scripts from node_modules directory
app.use('/js', express.static(__dirname + '/node_modules/survey-jquery/'));    

app.use(index);
app.use(patients);
app.use(procedures);
app.use(surveys);
app.use(mailer);
app.use(results);

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
