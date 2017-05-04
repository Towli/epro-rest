var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Procedure = require('../models/procedure');
var Survey = require('../models/survey');
var Mailer = require('../mailers/survey_mailer.js');
var fs = require('fs');
var ejs = require('ejs');

router.get('/mailer/:survey_id', function(req, res, next) {
  var surveyMailer = new Mailer();
  var compiledTemplate = compileEmailTemplate();
  Patient.findById(req.query.id, function(err, patient) {
    patient.survey_id = req.params.survey_id;
    mailOptions = {
       to: patient.contact.email,
       subject: 'Your survey',
       html: compiledTemplate({patient: patient})
    };
    surveyMailer.setOptions(mailOptions);
    surveyMailer.sendMail();
    res.redirect('/patients');
  });
  
});

function compileEmailTemplate() {
  return ejs.compile(fs.readFileSync('./templates/survey_template.ejs', 'utf-8'))
}

module.exports = router;