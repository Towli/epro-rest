$(document).ready(function(){

	var question1, question2, question3, question4;
	// Get Survey from JSON file
	$.getJSON("/survey.json", function (data, status) {
		var questionSet = data.questionSet;
		var questionsJSON = [];
		for (var i = 0; i < questionSet.questions.length; i++) {
			questionsJSON.push({
				name : "Question " + i,
				type : "radiogroup",
				title : questionSet.questions[i].title,
				isRequired : true,
				//colCount : 2,
				choices : ["choice_1", "choice_2", "choice_3", "choice_4"]
			});
		}
		/* Convert into JSON to build survey model */
		questionsJSON = JSON.stringify({ questions : questionsJSON });
		questionsJSON = JSON.parse(questionsJSON);

		Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
		Survey.Survey.cssType = "bootstrap";
		var survey = new Survey.Model(questionsJSON);

		function sendDataToServer(survey) {
			var resultAsString = JSON.stringify(survey.data);
	  		$("#results").append("<h3>JSON Results</h3>");
	  		$("#results").append(resultAsString);
		}

		$("#surveyElement").Survey({model:survey, onComplete:sendDataToServer});

	});
	
});