var express = require('express');
var router = express.Router();
var Mailer = require('../mailers/survey_mailer.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mailer', function(req, res, next) {
  console.log("hello world");
  var html = "<h1>Hi Alex</h1>";
  html += "<p><a href=\"http://epro-rest.herokuapp.com/surveys/58d862131d41f7002a6a8891\">Your survey</a></p>";
  var surveyMailer = new Mailer();
  mailOptions = {
     from: 'arnold@schwarzenegger',
     to: 'alextowli@hotmail.co.uk',
     subject: 'Your survey',
     html: html
  };
  surveyMailer.setOptions(mailOptions);
  surveyMailer.sendMail();
  console.log(surveyMailer);
  res.redirect('/');
});

module.exports = router;
