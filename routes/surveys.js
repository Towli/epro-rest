var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Procedure = require('../models/procedure');
var Survey = require('../models/survey');
var fs = require('fs');

/* GET /surveys/ (index page) */
router.get('/surveys', function(req, res, next) {
	res.render('surveys/index');
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
	.populate({
		path : 'question_set',
		populate : {
			path : 'questions',
			model : 'Question'
		}
	}).exec(function(err, procedure) {
		if (err) err;

		/* Create survey */
		var survey = {
			patient : null,
			questionSet : procedure.question_set,
			completed : false
		};

		/* Write json to file */
		survey = JSON.stringify(survey);
		try {
			fs.writeFile("public/survey.json", survey, function(err) {
				if (err)
					console.log(err);
				else {
					console.log("Survey JSON successfully written to file.");	
					res.render('surveys/show');	
				}
			});
		} catch (e) {
			console.log('File stream error: '+e);
		}
		
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