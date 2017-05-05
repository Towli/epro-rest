var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for procedure model */
var surveySchema = new Schema({
	patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
	question_set: { type: Schema.Types.ObjectId, ref: 'QuestionSet' },
	completed: Boolean,
	created_at: Date,
	completed_at: Date
});

/* Before-save callback */
surveySchema.pre('save', function(next) {
	var currentDate = new Date();
	if (!this.created_at)
		this.created_at = currentDate;
	this.completed_at = currentDate;
	next();
});

surveySchema.methods.created_at_humanized = function() {
	return this.created_at.toDateString();
}

module.exports = mongoose.model('Survey', surveySchema);