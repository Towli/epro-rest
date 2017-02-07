var express = require('express');
var router = express.Router();

/* GET /surveys/ (index page) */
router.get('/surveys', function(req, res, next) {
		res.render('surveys/index');
});

/* GET /surveys/example (example survey page) */
router.get('/surveys/example', function(req, res, next) {
		
		var surveyJSON = { 
			title: "Tell us, what technologies do you use?", 
			pages: [
			  { name:"page1", questions: [ 
			      { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "frameworkUsing",title: "Do you use any front-end framework like Bootstrap?" },
			      { type: "checkbox", choices: ["Bootstrap","Foundation"], hasOther: true, isRequired: true, name: "framework", title: "What front-end framework do you use?", visible: false }
			   ]},
			  { name: "page2", questions: [
			    { type: "radiogroup", choices: ["Yes","No"],isRequired: true, name: "mvvmUsing", title: "Do you use any MVVM framework?" },
			    { type: "checkbox", choices: [ "AngularJS", "KnockoutJS", "React" ], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visible: false } ] },
			  { name: "page3",questions: [
			    { type: "comment", name: "about", title: "Please tell us about your main requirements for Survey library" } ] }
			 ],
			 triggers: [
			  { type: "visible", operator: "equal", value: "Yes", name: "frameworkUsing", questions: ["framework"]},
			  { type: "visible", operator: "equal", value: "Yes", name: "mvvmUsing", questions: ["mvvm"]}
			 ]
		}

		res.render('surveys/example');
});

module.exports = router;