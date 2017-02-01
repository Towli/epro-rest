// Experimental seeding, not currently used

var ProcedureModel = require('mongoose').model('procedure');

function seedProcedures() {
	ProcedureModel.find({}, function (err, collection) {
		if (collection.length === 0) {
			seedProcedure('Carotid Endarterectomy');
			seedProcedure('Open abdominal aneurysm repair');
			seedProcedure('Stent grafting of abdominal aortic aneurysms');
			seedProcedure('Lower limb bypass and occlusive surgery');
			seedProcedure('Vascular access surgery');
			seedProcedure('Amputation');
			seedProcedure('In patient and day-case varicose vein surgery');
		}
	});

	function seedProcedure(name) {
		var procedure = new Procedure({
			name: name
		});

		/* Call the built-in save method to persist to db */
		procedure.save(function(err) {
			if (err) throw err;
			console.log('Procedure seeded successfully.');
		});
	}
}