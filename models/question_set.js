var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for procedure model */
var questionSetSchema = new Schema({
	name: String,
	excerpt: String,
	description: Date,
	department: String
});

module.exports = mongoose.model('questionSet', questionSetSchema);