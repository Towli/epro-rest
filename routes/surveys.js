"use strict";
const express = require('express')
	, router = express.Router()
	, Patient = require('../models/patient')
	, Procedure = require('../models/procedure')
	, Survey = require('../models/survey')
	, fs = require('fs');

/* GET /surveys/ (index page) */
router.get('/surveys', function(req, res, next) {
	Survey.find({})
	.populate('patient')
	.exec(function(err, surveys) {
		if (err) throw err;
		res.render('surveys/index', { surveys: surveys, flash: req.flash()});
	});
});

/* GET /surveys/new (survey creation page) */
router.get('/surveys/new', function(req, res, next) {
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		Patient.find({}, function(err, patients) {
			if (err) throw err;
			res.render('surveys/new', { procedures : procedures, patients : patients, flash: req.flash()});
		});
	});
});

/* POST /surveys/new (on survey creation) */
router.post('/surveys/new', function(req, res, next) {
	/* Check if Survey hasn't already been generated for the chosen patient */
	Survey.count({patient: req.body.patient}, function(err, count) {
		if (err) throw err;
		if (count > 0) {
			req.flash('danger', 'This patient already has a generated Survey.');
			res.redirect('new');
		} 
		else
		Patient.findById(req.body.patient)
		.populate('procedure')
		.exec(function(err, patient) {
			/* Create survey */
			var survey = new Survey ({
				patient: patient,
				questions: patient.procedure.questions,
				completed: false,
				delivered: false
			});
			/* Call the built-in save method to persist to db */
			survey.save(function(err) {
				if (err) throw err;
				req.flash('success', 'Survey for: ' + patient.full_name() + ' generated succesfully.');
				res.redirect(survey._id);
			});
		});
	});
});

/* GET /surveys/:id (show survey) */
router.get('/surveys/:id', function(req, res, next) {
	let id = req.params.id;
	let question_set;
	Survey.findById(id)
	.populate('questions')
	.populate('patient')
	.exec(function(err, survey) {
		if (err) throw err;
		let backURL = req.header('Referer') || null;
		if (survey.is_complete())
			res.redirect('/surveys/'+id+'/results');
		question_set = survey.questions;
		res.render('surveys/show', { question_set: JSON.stringify(question_set),
			patient : survey.patient, flash: req.flash(), backURL: backURL });
	});
});

/* GET /surveys/:id/results (show survey results) */
router.get('/surveys/:id/results', function(req, res, next) {
	let id = req.params.id;
	Survey.findById(id)
	.populate('patient')
	.exec(function(err, survey) {
		if (err) throw err;
		let backURL = req.header('Referer') || null;
		res.render('surveys/results', { survey: survey, patient : survey.patient, backURL: backURL });
	});
});

/* POST /surveys/:id (survey completion) */
router.post('/surveys/:id', function(req, res, next) {
	let id = req.params.id;
	let results = JSON.parse(req.body.results);
	Survey.findById(id, function (err, survey) {
		if (err) throw err;
		survey.results = results;
		survey.complete();
		survey.save(function(err) {
			if (err) throw err;
			res.end("Results saved.");
		});
	});
});

/* DELETE /surveys/:id */
router.post('/surveys', function(req, res, next) {
	let id = req.body.id;
	Survey.findByIdAndRemove(id, function(err, survey) {
		req.flash('success', 'Survey deleted successfully.');
		res.redirect('/surveys');
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