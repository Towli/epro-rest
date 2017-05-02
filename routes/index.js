var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mailer', function(req, res, next) {
  var nodemailer = require('nodemailer');
  
  var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "alextowli@gmail.com",
            pass: "Alex7towli1114"
        }
  });
  
  var html = "<h1>Hi Alex</h1>";
  html += "<p><a href=\"http://epro-rest.herokuapp.com/surveys/58d862131d41f7002a6a8891\">Your survey</a></p>";

  mailOptions = {
     from: 'arnold@schwarzenegger',
     to: 'alextowli@hotmail.co.uk',
     subject: 'Your survey',
     html: html
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error)
      return console.log(error);
    console.log('Message %s sent: %s', info.messageId, info.response);
    transporter.close();
  });

  res.redirect('/');
});

module.exports = router;
