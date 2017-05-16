var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Create a schema for procedure model */
var procedureSchema = new Schema({
	name: String,
	excerpt: String,
	description: String,
	department: String,
	questions : [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

/* Converts the Procedure's description to an excerpt of 120 characters */
procedureSchema.methods.description_to_excerpt = function () {
	var excerpt = this.description.substring(0, 120);
	excerpt += "...";
	return excerpt;
}

procedureSchema.methods.questions_html_humanized = function() {
	if (!this.questions)
		return "<p>Question set has not been assigned.</p>";
	else {
		var questions = this.questions;
		var questions_html = "<ul>";
		var id = "";
		for (var i = 0; i < questions.length; i++) {
			id = this.questions[i]._id;
			questions_html += "<li value=\""+id+"\">"+questions[i].title+"</li>";
		}
		questions_html += "</ul>"
		return questions_html;
	}
}

procedureSchema.methods.questions_html_formized = function() {
	if (!this.questions)
		return "<ul>Question set has not been assigned.</ul>";
	else {
		var questions = this.questions;
		var questions_html = "<ul>";
		var id = "";
		for (var i = 0; i < questions.length; i++) {
			id = this.questions[i]._id;
			questions_html += "<li>"+questions[i].title+
			"<input type=\"hidden\" name=\"question\" value=\""+id+"\"</li>";
		}
		questions_html += "</ul>"
		return questions_html;
	}
}

module.exports = mongoose.model('Procedure', procedureSchema);