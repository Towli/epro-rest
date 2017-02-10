var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Procedure = require('../models/procedure');
var Survey = require('../models/survey');

/* GET /surveys/ (index page) */
router.get('/surveys', function(req, res, next) {
	res.render('surveys/index');
});

/* GET /surveys/dynamic (dynamically generated survey page) */
router.get('/surveys/dynamic', function(req, res, next) {
	Patient.findOne({ first_name: 'Alex'}, function(err, patient) {
		if (err) return err;

		/* Determine question set */
		var question1, question2, question3, question4;
		if (patient.gender == 'male')
			question1 = "Question targeted at Males";
		else
			question1 = "Question targeted at Females";

		/* Create a new patient from req params */
		var survey = new Survey({	
			patient: patient,
			questionSet: { 
				question1: question1,
				question2: "Placeholder",
				question3: "Placeholder",
				question4: "Placeholder"
			},
			completed: false
		});

		res.render('surveys/dynamic', {patient:patient, survey: survey});
	});
});

router.get('/surveys/new', function(req, res, next) {
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		res.render('surveys/new', { procedures : procedures });
	});
});

/* GET /surveys/example1 (example survey page) */
router.get('/surveys/example1', function(req, res, next) {
	res.render('surveys/example');
});

/* GET /surveys/example2 (example survey page) */
router.get('/surveys/example2', function(req, res, next) {
	res.render('surveys/example2');
});

module.exports = router;