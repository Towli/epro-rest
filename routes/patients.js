var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Procedure = require('../models/procedure');
var Survey = require('../models/survey');

/* GET /patients/ (index page) */
router.get('/patients', function(req, res, next) {
	/* Find all patients */
	Patient.find({}, function(err, patients) {
		if (err) throw err;
		res.render('patients/index', {patients : patients});
	});
});

/* GET /patients/new (new patient page) */
router.get('/patients/new/', function(req, res, next) {
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		res.render('patients/new', {procedures : procedures});
	})
});

/* POST /patients/new */
router.post('/patients/new', function(req, res, next) {
	/* Create a new patient from req params */
	var patient = new Patient({	
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		dob: req.body.dob,
		gender: req.body.gender,
		contact: { 
			phone: req.body.phone,
			email: req.body.email 
		},
		procedure: req.body.procedure,
		surveyed: false	// TODO functionality
	});

	/* Call the built-in save method to persist to db */
	patient.save(function(err) {
		if (err) throw err;
		console.log('Patient saved successfully.');
		console.log(patient);
	});

	res.redirect('/patients');
});

/* GET /patients/:id (show patient page) */
router.get('/patients/:id', function(req, res) {
	var id = req.params.id;
	Patient.findById(id)
	.populate('procedure')
	.exec(function(err, patient) {
		if (err) throw err;
		Survey.findOne({patient: patient}, function(err, survey) {
			if (err) throw err;
			res.render('patients/show', {patient : patient, survey : survey});
		});
	});
});

/* DELETE /patients/:id */
router.post('/patients', function(req, res, next) {
	var id = req.body.id;
	console.log("id = "+id);
	Patient.findByIdAndRemove(id, function(err, patient) {
		res.redirect('/patients');
	});
});

module.exports = router;