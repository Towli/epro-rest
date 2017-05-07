var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Procedure = require('../models/procedure');
var Survey = require('../models/survey');
var fs = require('fs');

/* GET /surveys/ (index page) */
router.get('/surveys', function(req, res, next) {
	Survey.find({})
	.populate('patient')
	.exec(function(err, surveys) {
		if (err) throw err;
		res.render('surveys/index', { surveys: surveys });
	});
});

/* GET /surveys/new (survey creation page) */
router.get('/surveys/new', function(req, res, next) {
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		Patient.find({}, function(err, patients) {
			if (err) throw err;
			res.render('surveys/new', { procedures : procedures, patients : patients });
		});
	});
});

/* POST /surveys/new (on survey creation) */
router.post('/surveys/new', function(req, res, next) {
	/* Check if Survey hasn't already been generated for the chosen patient */
	Survey.count({patient: req.body.patient}, function(err, count) {
		if (err) throw err;
		if (count > 0)
			res.redirect('new');
		else
		/* Get procedure from req params */
		Procedure.findById(req.body.procedure)
		.exec(function(err, procedure) {
			if (err) throw err;
			Patient.findById(req.body.patient)
			.exec(function(err, patient) {
				/* Create survey */
				var survey = new Survey ({
					patient: patient,
					question_set: procedure.question_set,
					completed: false,
					delivered: false
				});
				/* Call the built-in save method to persist to db */
				survey.save(function(err) {
					if (err) throw err;
					res.redirect(survey._id);
				});
			});
		});
	});
});

/* GET /surveys/:id (show survey) */
router.get('/surveys/:id', function(req, res, next) {
	var id = req.params.id;
	var question_set;
	Survey.findById(id)
	.populate({
		path : 'question_set',
		populate : {
			path : 'questions',
			model : 'Question'
		}
	})
	.populate('patient')
	.exec(function(err, survey) {
		if (err) throw err;
		question_set = survey.question_set;
		console.log(survey.patient);
		res.render('surveys/show', { question_set: JSON.stringify(question_set), patient : survey.patient });
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