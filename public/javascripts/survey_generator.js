$(document).ready(function(){

	var question1, question2, question3, question4;
	// Get Survey from JSON file
	$.getJSON("/survey.json", function (data, status) {
		var questionSet = data.questionSet;
		question1 = questionSet.question1;
		question2 = questionSet.question2;
		question3 = questionSet.question3;
		question4 = questionSet.question4;
		$('#output-test').append(question1);
		$('#output-test').append(question2);
		$('#output-test').append(question3);
		$('#output-test').append(question4);

		Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
		Survey.Survey.cssType = "bootstrap";
		var survey = new Survey.Model( { questions: [
		     {name:"name", type:"text", title: question1, placeHolder:"Jon Snow", isRequired: true},
		     {name:"birthdate", type:"text", inputType:"date", title: question2, isRequired: true},
		     {name:"color", type:"text", inputType:"color", title: question3},
		     {name:"email", type:"text", inputType:"email", title: 	question4, placeHolder:"jon.snow@nightwatch.org", isRequired: true, validators: [{type:"email"}]}
		]});

		function sendDataToServer(survey) {
			var resultAsString = JSON.stringify(survey.data);
	  		$("#results").append("<h3>JSON Results</h3>");
	  		$("#results").append(resultAsString);
		}

		$("#surveyElement").Survey({model:survey, onComplete:sendDataToServer});

	});
	
});