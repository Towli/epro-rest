var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for patient model */
var questionSchema = new Schema({
	title: String
});

module.exports = mongoose.model('Question', questionSchema);