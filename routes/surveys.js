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

/* GET /surveys/new (survey creation page) */
router.get('/surveys/new', function(req, res, next) {
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		res.render('surveys/new', { procedures : procedures });
	});
});

/* POST /surveys/new (on survey creation) */
router.post('/surveys/new', function(req, res, next) {
	/* Get procedure from req params */
	Procedure.findById(req.body.procedure)
	.populate('procedure').exec(function(err, procedure) {
		if (err) err;
		/* Create a new survey from req params */
		var question1 = "Question 1 for " + procedure.name;
		var question2 = "Question 2 for " + procedure.name; 
		var question3 = "Question 3 for " + procedure.name;
		var question4 = "Question 4 for " + procedure.name;

		var survey = new Survey({
			patient: null,
			questionSet: {
				question1: question1,
				question2: question2,
				question3: question3,
				question4: question4 
			},
			completed: false
		});
		res.render('surveys/show', { survey : survey });
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

/* GET /surveys/:id (show survey) */
router.get('/surveys/:id', function(req, res, next) {
	res.render('surveys/show'); //todo
});

module.exports = router;