var express = require('express');
var router = express.Router();
var Procedure = require('../models/procedure');

/* GET /patients/ (index page) */
router.get('/procedures', function(req, res, next) {
	/* Find all patients */
	Procedure.find({}, function(err, procedures) {
		if (err) throw err;
		res.render('procedures/index', {procedures : procedures});
	});
});

module.exports = router;