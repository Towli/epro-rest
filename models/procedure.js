var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for procedure model */
var procedureSchema = new Schema({
	name: String,
	excerpt: String,
	description: Date,
	department: String
});

var Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = Procedure;