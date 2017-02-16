var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create a schema for procedure model */
var questionSetSchema = new Schema({
	procedure : {type: Schema.Types.ObjectId, ref: 'Procedure'},
	questions : [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

questionSetSchema.methods.has_assigned_questions = function() {
	return this.questions != null;
}

module.exports = mongoose.model('QuestionSet', questionSetSchema);