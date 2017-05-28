"use strict";
$(document).ready(function(){
	Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
	Survey.Survey.cssType = "bootstrap";
	var survey = new Survey.Model( { questions: [
	     {name:"name", type:"text", title: "Please enter your name:", placeHolder:"Jon Snow", isRequired: true},
	     {name:"birthdate", type:"text", inputType:"date", title: "Your birthdate:", isRequired: true},
	     {name:"color", type:"text", inputType:"color", title: "Your favorite color:"},
	     {name:"email", type:"text", inputType:"email", title: "Your e-mail:", placeHolder:"jon.snow@nightwatch.org", isRequired: true, validators: [{type:"email"}]}
	]});

	function sendDataToServer(survey) {
		var resultAsString = JSON.stringify(survey.data);
  		$("#results").append("<h3>JSON Results</h3>");
  		$("#results").append(resultAsString);
	}

	$("#surveyElement").Survey({model:survey, onComplete:sendDataToServer});

});