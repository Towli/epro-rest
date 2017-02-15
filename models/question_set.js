var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for procedure model */
var questionSetSchema = new Schema({
	questions : [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

module.exports = mongoose.model('QuestionSet', questionSetSchema);