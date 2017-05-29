var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for procedure model */
var surveySchema = new Schema({
	patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
	questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
	results: Object,
	completed: Boolean,
	delivered: Boolean,
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

surveySchema.methods.createdAtHumanized = function() {
	return this.created_at.toDateString();
}

surveySchema.methods.complete = function() {
	var currentDate = new Date();
	this.completed = true;
	this.completed_at = currentDate;
}

surveySchema.methods.completedAtHumanized = function() {
	return this.completed_at.toDateString();
}

surveySchema.methods.completionStatus = function() {
	if (this.completed)
		return "Complete"
	else
		return "Incomplete"
}

surveySchema.methods.isDelivered = function() {
	return this.delivered;
}

surveySchema.methods.isComplete = function() {
	return this.completed;
}

module.exports = mongoose.model('Survey', surveySchema);