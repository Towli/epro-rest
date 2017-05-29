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
  , expressValidator = require('express-validator')
  , app = express();

/* Use helmet early to ensure headers are sure to be set */
app.use(helmet());

/* Establish connection to MongoDB instance */
var config = require('./config.json')[app.get('env')];
mongoose.connect(config.mongoURI);
mongoose.Promise = Promise;

/* Test Connection */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to mongo database localhost:27017/epro');
});

/* View engine setup (EJS) */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

/* Parsers and data validation */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

/* Use flash-feedback with session object */
app.use(cookieParser('abc'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

/* Fetch scripts from node_modules directory */
app.use('/js', express.static(__dirname + '/node_modules/survey-jquery/'));    

app.use(index);
app.use(patients);
app.use(procedures);
app.use(surveys);
app.use(mailer);
app.use(results);

/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* Error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
