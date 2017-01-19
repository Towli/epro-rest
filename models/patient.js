var mongoose = require('mongoose');
var schema = mongoose.Schema;

// create a schema for patient model
var patientSchema = new Schema({
	first_name: String,
	last_name: String,
	dob: Date,
	gender: String,
	surveyed: Boolean,
	created_at: Date,
	updated_at: Date
});

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;