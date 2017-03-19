$(document).ready(function(){
	// Get Survey from JSON file
	$.getJSON("/survey.json", function (data, status) {
		var question_set = data.question_set;
		var questions_JSON = [];
		for (var i = 0; i < question_set.questions.length; i++) {
			questions_JSON.push({
				name : "Question " + i,
				type : "radiogroup",
				title : question_set.questions[i].title,
				isRequired : true,
				//colCount : 2,
				choices : ["choice_1", "choice_2", "choice_3", "choice_4"]
			});
		}
		/* Convert into JSON to build survey model */
		questions_JSON = JSON.stringify({ questions : questions_JSON });
		questions_JSON = JSON.parse(questions_JSON);

		Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
		Survey.Survey.cssType = "bootstrap";
		var survey = new Survey.Model(questions_JSON);

		function sendDataToServer(survey) {
			var resultAsString = JSON.stringify(survey.data);
	  		$("#results").append("<h3>JSON Results</h3>");
	  		$("#results").append(resultAsString);
		}

		$("#surveyElement").Survey({model:survey, onComplete:sendDataToServer});

	});
});