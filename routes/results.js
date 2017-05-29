"use strict";
const express = require('express')
  , router = express.Router()
  , Survey = require('../models/survey')
  , json2csv = require('json2csv');

router.post('/export', function(req, res, next) {
  let patientID = req.body.patientID;
  Survey.findOne({patient: patientID})
  .exec(function(err, survey) {
    if (err) throw err;
    let csv = resultsToCSV(survey.results);
      res.end(csv);
  });
});

function resultsToCSV(data) {
  let fieldNames = ['Question', 'Answer'];
  try {
    return json2csv({data: data});
  } catch (err) {
    console.error(err);
  }
}

module.exports = router;