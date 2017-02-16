var express = require('express');
var router = express.Router();
var Procedure = require('../models/procedure');
var Question = require('../models/question');
var QuestionSet = require('../models/question_set');

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
	.populate({
		path : 'question_set',
		populate : {
			path : 'questions',
			model : 'Question'
		}
	})
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
	var questions = req.body.questions;
    var new_question_set = new QuestionSet({
        procedure: id,
        questions: questions
    });

	/*  */
	QuestionSet.findOne({'procedure' : id}, function(err, question_set, next) {
		if (err) throw err;
		if (!question_set)
			question_set = new_question_set;
		else 

		/* If the procedure has an existing question_set, update it */
		question_set.questions = questions;
		question_set.save(function(err) {
			if (err) throw err;
			console.log('QuestionSet updated successfully.');
		});

		/* Update procedure */
		Procedure.findById(id, function(err, procedure) {
			if (err) throw err;
			procedure.question_set = question_set;
			procedure.save(function(err, updated_procedure) {
				if (err) throw err;
				/* Find all questions */
				Question.find({}, function(err, questions) {
					if (err) throw err;
					res.redirect('/procedures/'+id+'/edit');
				});
			});
		});
	});
});

module.exports = router;