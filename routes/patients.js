var express = require('express');
var router = express.Router();

/* GET /patients/ (index page) */
router.get('/patients', function(req, res, next) {
  res.send('patients#index');
});

/* GET /patients/new (new patient page) */
router.get('/patients/new/', function(req, res, next) {
	res.send('patients#new');
});

router.get('/patients/:id', function(req, res) {
	res.send('patients#show');
});

module.exports = router;
