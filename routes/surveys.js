var express = require('express');
var router = express.Router();

/* GET /surveys/ (index page) */
router.get('/surveys', function(req, res, next) {
		res.render('surveys/index');
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