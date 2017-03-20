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
		var survey = new Survey ({
			patient : null,
			question_set : procedure.question_set,
			completed : false
		});

		console.log(JSON.stringify(survey));

		/* Call the built-in save method to persist to db */
		survey.save(function(err) {
			if (err) throw err;
			console.log('Survey saved successfully.');
			console.log(survey);
		});

		/* Write json to file */
		/*survey = JSON.stringify(survey);
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
		}*/
		
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
	.exec(function(err, survey) {
		if (err) throw err;
		question_set = survey.question_set;
		res.render('surveys/show', { question_set: JSON.stringify(question_set) });
	});
});

module.exports = router;