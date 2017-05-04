var express = require('express');
var router = express.Router();
var Mailer = require('../mailers/survey_mailer.js');
var fs = require('fs');
var ejs = require('ejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mailer', function(req, res, next) {
  var patient = {
    first_name: "Harri",
    last_name: "Cornes",
    survey_id: "58d862131d41f7002a6a8891"
  };

  var compiledTemplate = ejs.compile(fs.readFileSync('./templates/survey_template.ejs', 'utf-8'));
  var surveyMailer = new Mailer();
  mailOptions = {
     from: 'arnold@schwarzenegger',
     to: 'alextowli@hotmail.co.uk',
     subject: 'Your survey',
     html: compiledTemplate({patient: patient})
  };
  surveyMailer.setOptions(mailOptions);
  surveyMailer.sendMail();
  console.log(surveyMailer);
  res.redirect('/');
});

module.exports = router;