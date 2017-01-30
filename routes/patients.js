var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');

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
	res.render('patients/new');
});

router.post('/patients/new', function(req, res, next) {
	
	/* Create a new patient from req params */
	var patient = new Patient({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		dob: req.body.dob,
		gender: req.body.gender,
		surveyed: false	// TODO functionality
	});

	/* Call the built-in save method to persist to db */
	patient.save(function(err) {
		if (err) throw err;
		console.log('Patient saved successfully.');
		console.log(patient);
	});

	res.render('patients/new');
});

router.get('/patients/:id', function(req, res) {
	res.render('patients/show');
});

module.exports = router;
