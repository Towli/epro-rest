$(document).ready(function(){

	var question1, question2, question3, question4;
	// Get Survey from JSON file
	$.getJSON("/survey.json", function (data, status) {
		var questionSet = data.questionSet;
		question1 = questionSet.question1;
		question2 = questionSet.question2;
		question3 = questionSet.question3;
		question4 = questionSet.question4;

		Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
		Survey.Survey.cssType = "bootstrap";
		var survey = new Survey.Model( { questions: [
			{ 	name:"question1", type:"radiogroup", title: question1, isRequired: true,
				colCount: 2, choices: ["choice_1", "choice_2", "choice_3", "choice_4"]			
			},
			{ 	name:"question2", type:"radiogroup", title: question2, isRequired: true,
				colCount: 2, choices: ["choice_1", "choice_2", "choice_3", "choice_4"]			
			},
			{ 	name:"question3", type:"radiogroup", title: question3, isRequired: true,
				colCount: 2, choices: ["choice_1", "choice_2", "choice_3", "choice_4"]			
			},
			{ 	name:"question4", type:"radiogroup", title: question4, isRequired: true,
				colCount: 2, choices: ["choice_1", "choice_2", "choice_3", "choice_4"]			
			},
		]});

		function sendDataToServer(survey) {
			var resultAsString = JSON.stringify(survey.data);
	  		$("#results").append("<h3>JSON Results</h3>");
	  		$("#results").append(resultAsString);
		}

		$("#surveyElement").Survey({model:survey, onComplete:sendDataToServer});

	});
	
});