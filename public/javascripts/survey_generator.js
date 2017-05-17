$(document).ready(function(){
	var pathname = window.location.pathname;
	console.log(pathname);
	var question_set = JSON.parse($('#questions-json').attr('value'));
	
	// Get Survey from JSON file
	var survey_builder = [];
	for (var i = 0; i < question_set.length; i++) {
		survey_builder.push({
			name : "Question " + i,
			type : "radiogroup",
			title : question_set[i].title,
			isRequired : true,
			//colCount : 2,
			choices : question_set[i].choices	// currently hard-coded, should in future be determined by the question_set JSON
		});
	}
	/* Convert into JSON to build survey model */
	survey_builder = JSON.stringify({ questions : survey_builder });
	survey_builder = JSON.parse(survey_builder);

	/* Set survey styling */
	Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
	Survey.Survey.cssType = "bootstrap";
	var survey = new Survey.Model(survey_builder);

	function sendDataToServer(survey) {
		var resultAsString = JSON.stringify(survey.data);
		$.post(pathname, { results: resultAsString }).done(function(status) {
			$("#notifier").append(status);
    });
	}

	$("#surveyElement").Survey({model:survey, onComplete:sendDataToServer});

});