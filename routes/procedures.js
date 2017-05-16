var express = require('express');
var router = express.Router();
var Procedure = require('../models/procedure');
var Question = require('../models/question');

/* GET /patients/ (index page) */
router.get('/procedures', function(req, res, next) {
	/* Find all patients */
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		res.render('procedures/index', {procedures : procedures});
	});
});

/* GET /patients/ (index page) */
router.get('/procedures/:id/edit', function(req, res, next) {
	/* Find all patients */
	var id = req.params.id;
	Procedure.findById(id)
	.populate('questions')
	.exec(function(err, procedure) {
		if (err) throw err;
		/* Find all questions */
		Question.find({}, function(err, questions) {
			if (err) throw err;
			res.render('procedures/edit', {procedure : procedure, questions : questions});
		});
	});
});

/* POST /procedures/:id/edit */
router.post('/procedures/:id/edit', function(req, res, next) {
	var id = req.params.id;
	var questions = req.body.question;

	Procedure.findById(id, function(err, procedure) {
		if (err) throw err;
		procedure.questions = questions;
		console.log(questions);
		console.log(procedure);
		procedure.save(function(err, updated_procedure) {
			if (err) throw err;
			res.redirect('/procedures/'+id+'/edit');
		});
	});
});

module.exports = router;