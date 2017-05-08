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
patientSchema.methods.full_name = function() {
	return this.first_name + " " + this.last_name;
}

patientSchema.methods.created_at_humanized = function() {
	return this.created_at.toDateString();
}

patientSchema.methods.dob_humanized = function() {
	return this.dob.toDateString();
}

patientSchema.methods.dob_form_format = function() {
	var day = ('0' + this.dob.getDate()).slice(-2);
	var month = ('0' + (this.dob.getMonth()+1)).slice(-2);
	var dob_form_format = this.dob.getFullYear() + 
	"-" + month + "-" + day;
	return dob_form_format;
}

patientSchema.methods.age = function() {
	var current_date = new Date();
	var current_year = current_date.getFullYear();
	var current_month = current_date.getMonth();
	var patient_age = current_year - this.dob.getFullYear();

	/* If month of birth is greater than the current month, subtract a year of age */
	if (this.dob.getMonth() > current_month)
		patient_age--;

	return patient_age;
}

module.exports = mongoose.model('Patient', patientSchema);