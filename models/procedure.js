var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Create a schema for procedure model */
var procedureSchema = new Schema({
	name: String,
	excerpt: String,
	description: String,
	department: String,
	question_set: { type: Schema.Types.ObjectId, ref: 'QuestionSet' },
});

/* Converts the Procedure's description to an excerpt of 120 characters */
procedureSchema.methods.description_to_excerpt = function () {
	var excerpt = this.description.substring(0, 120);
	excerpt += "...";
	return excerpt;
}

procedureSchema.methods.questions_html_humanized = function() {
	if (!this.question_set)
		return "<p>Question set has not been assigned.</p>";
	else {
		var questions_html = "";
		for (var i = 0; i < this.question_set.questions.length; i++) {
			questions_html += "<p>"+this.question_set.questions[i].title+"</p>";
		}
		return questions_html;
	}
}

module.exports = mongoose.model('Procedure', procedureSchema);