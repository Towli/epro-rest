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
patientSchema.methods.fullName = function() {
	return this.first_name + " " + this.last_name;
}

patientSchema.methods.createdAtHumanized = function() {
	return this.created_at.toDateString();
}

patientSchema.methods.dobHumanized = function() {
	return this.dob.toDateString();
}

patientSchema.methods.dobFormFormat = function() {
	var day = ('0' + this.dob.getDate()).slice(-2);
	var month = ('0' + (this.dob.getMonth()+1)).slice(-2);
	var dobFormFormat = this.dob.getFullYear() + 
	"-" + month + "-" + day;
	return dobFormFormat;
}

patientSchema.methods.age = function() {
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth();
	var patientAge = currentYear - this.dob.getFullYear();

	/* If month of birth is greater than the current month, subtract a year of age */
	if (this.dob.getMonth() > currentMonth)
		patientAge--;

	return patientAge;
}

module.exports = mongoose.model('Patient', patientSchema);