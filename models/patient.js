var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for patient model */
var patientSchema = new Schema({
	first_name: String,
	last_name: String,
	contact: {
		phone: String,
		email: String
	},
	procedure: { type: Schema.Types.ObjectId, ref: 'Procedure' }, 
	dob: Date,
	gender: String,
	surveyed: Boolean,
	created_at: Date,
	updated_at: Date
});

/* Before-save callback */
patientSchema.pre('save', function(next) {
	var currentDate = new Date();
	if (!this.created_at)
		this.created_at = currentDate;
	this.updated_at = currentDate;
	next();
});

/* Helper methods */
patientSchema.methods.full_name = function(cb) {
	return this.first_name + " " + this.last_name;
}

patientSchema.methods.created_at_humanized = function(cb) {
	return this.created_at.toDateString();
}

patientSchema.methods.dob_humanized = function(cb) {
	return this.dob.toDateString();
}

module.exports = mongoose.model('Patient', patientSchema);