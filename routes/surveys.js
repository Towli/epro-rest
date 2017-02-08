var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Procedure = require('../models/procedure');

/* GET /surveys/ (index page) */
router.get('/surveys', function(req, res, next) {
	res.render('surveys/index');
});

/* GET /surveys/dynamic (dynamically generated survey page) */
router.get('/surveys/dynamic', function(req, res, next) {
	Patient.findOne({ first_name: 'Alex'}, function(err, patient) {
		if (err) return err;
		res.render('surveys/dynamic', {patient:patient});
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

/* GET /surveys/example3 (example survey page) */
router.get('/surveys/example3', function(req, res, next) {
	res.render('surveys/example3');
});

module.exports = router;