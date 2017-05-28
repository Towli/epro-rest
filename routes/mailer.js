"use strict";
const express = require('express')
  , router = express.Router()
  , Patient = require('../models/patient')
  , Procedure = require('../models/procedure')
  , Survey = require('../models/survey')
  , Mailer = require('../mailers/survey_mailer.js')
  , fs = require('fs')
  , ejs = require('ejs');

/* GET /mailer/survey_id for mailing a survey to a patient */
router.get('/mailer/:survey_id', function(req, res, next) {
  let Factory = new Mailer.Factory();
  let surveyMailer = Factory.createMailer("GMAIL");
  let compiledTemplate = compileEmailTemplate();
  let survey_id = req.params.survey_id;
  
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