var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for procedure model */
var procedureSchema = new Schema({
	name: String,
	excerpt: String,
	description: Date,
	department: String
});

module.exports = mongoose.model('Procedure', procedureSchema);