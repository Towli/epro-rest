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
  var Factory = new Mailer.Factory();
  var surveyMailer = Factory.createMailer("GMAIL");
  var compiledTemplate = compileEmailTemplate();
  var survey_id = req.params.survey_id;
  
  Survey.findById(survey_id)
  .populate('patient')
  .exec(function (err, survey) {
    mailOptions = {
       to: survey.patient.contact.email,
       subject: 'Your survey',
       html: compiledTemplate({patient: survey.patient, survey_id: survey_id})
    };
    surveyMailer.setOptions(mailOptions);
    surveyMailer.sendMail(function() {
      survey.delivered = true;
      survey.save();
      req.flash('success', 'Survey delivered successfully.');
      res.redirect('/patients');
    });
  });  
});

function compileEmailTemplate() {
  return ejs.compile(fs.readFileSync('./templates/survey_template.ejs', 'utf-8'))
}

module.exports = router;