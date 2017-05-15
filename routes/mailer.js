var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Procedure = require('../models/procedure');
var Survey = require('../models/survey');
var Mailer = require('../mailers/survey_mailer.js');
var fs = require('fs');
var ejs = require('ejs');

/* GET /mailer/survey_id for mailing a survey to a patient */
router.get('/mailer/:survey_id', function(req, res, next) {
  var surveyMailer = new Mailer();
  var compiledTemplate = compileEmailTemplate();
  Survey.findById(req.params.survey_id)
  .populate('patient')
  .exec(function (err, survey) {
    mailOptions = {
       to: survey.patient.contact.email,
       subject: 'Your survey',
       html: compiledTemplate({patient: survey.patient})
    };
    surveyMailer.setOptions(mailOptions);
    surveyMailer.sendMail(function() {
      survey.delivered = true;
      survey.save();
    });
    res.redirect('/patients');
  });  
});

function compileEmailTemplate() {
  return ejs.compile(fs.readFileSync('./templates/survey_template.ejs', 'utf-8'))
}

module.exports = router;