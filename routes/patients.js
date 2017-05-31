"use strict";
const express = require('express')
	, router = express.Router()
	, Patient = require('../models/patient')
	, Procedure = require('../models/procedure')
	, Survey = require('../models/survey');

/* GET /patients/ (index page) */
router.get('/patients', function(req, res, next) {
	/* Find all patients */
	Patient.find({}, function(err, patients) {
		if (err) throw err;
		res.render('patients/index', {patients : patients, flash: req.flash()});
	});
});

/* GET /patients/new (new patient page) */
router.get('/patients/new/', function(req, res, next) {
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		res.render('patients/new', {error: undefined, procedures : procedures});
	})
});

/* POST /patients/new */
router.post('/patients/new', function(req, res, next) {
	/* Create a new patient from req params */
	let errors = validateNewPatient(req);
	if (errors)
		Procedure.find({}, function(err, procedures) {
			if (err) throw err;
			res.render('patients/new', {errors: errors, procedures : procedures});
		}) 
	else {
		let patient = buildPatient(req);
		console.log(patient);
		/* Call the built-in save method to persist to db */
		patient.save(function(err) {
			if (err) throw err;
			req.flash('success', 'Patient successfully created!');
			res.redirect('/patients');
		});
	}
});

/* GET /patients/:id (show patient page) */
router.get('/patients/:id', function(req, res) {
	let id = req.params.id;
	Patient.findById(id)
	.populate('procedure')
	.exec(function(err, patient) {
		if (err) throw err;
		Survey.findOne({patient: patient}, function(err, survey) {
			if (err) throw err;
			res.render('patients/show', {patient : patient, survey : survey, flash: req.flash()});
		});
	});
});

/* GET /patients/:id/edit (edit patient page) */
router.get('/patients/:id/edit', function(req, res) {
	let id = req.params.id;	
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		Patient.findById(id)
		.populate('procedure')
		.exec(function(err, patient) {
			if (err) throw err;
			res.render('patients/edit', {patient : patient, procedures: procedures});
		});
	});
});

router.post('/patients/:id/edit', function(req, res) {
	/* Update patient from req params */
	Patient.findOneAndUpdate({ _id: req.params.id }, {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		dob: req.body.dob,
		gender: req.body.gender,
		contact: { 
			phone: req.body.phone,
			email: req.body.email 
		},
		procedure: req.body.procedure
	}, function(err, raw) {
		if (err) throw err;
		req.flash('success', 'Patient updated successfully.');
		res.redirect('/patients/'+req.params.id);
	});
});

/* DELETE /patients/:id */
router.post('/patients', function(req, res, next) {
	let id = req.body.id;
	Patient.findByIdAndRemove(id, function(err, patient) {
		Survey.remove({patient: id}, function(err, survey) {
			req.flash('success', 'Patient deleted successfully.');
			res.redirect('/patients');
		});
	});
});

/* Validates and sanitizes a req.body for a new patient */
function validateNewPatient(req) {
	req.checkBody('first_name', 'Invalid name').isAlpha();
	req.checkBody('last_name', 'Invalid name').isAlpha();
	req.checkBody('dob', 'No DOB').notEmpty();
	req.checkBody('phone', 'Invalid number').isMobilePhone("en-GB");
	req.checkBody('email', 'Invalid name').notEmpty();
	req.checkBody('gender', 'No gender').notEmpty();
	req.sanitizeBody('first_name').escape();
	req.sanitizeBody('last_name').escape();
	req.sanitizeBody('phone').escape();
	req.sanitizeBody('email').escape();
	return req.validationErrors();
}

/* Builds a new Patient from schema */
function buildPatient(req) {
	return new Patient({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		dob: req.body.dob,
		gender: req.body.gender,
		contact: { 
			phone: req.body.phone,
			email: req.body.email 
		},
		procedure: req.body.procedure,
		surveyed: false
	});
}

module.exports = router;