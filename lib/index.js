var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AuditModel

var auditSchema = new Schema({
	model: String,
	counter: Number,
	functionality: String
})

var functionality = {
	save: ['save'],
	remove: ['remove', 'findOneAndRemove'],
	update: ['update', 'findOneAndUpdate'],
	find: ['find', 'findOne']
}

exports.initialize = function (connection, auditedModel) {
	// check audit collection already exists
	AuditModel = connection.model('AuditModel', auditSchema)
	connection.on('open', function () {
		connection.db.listCollections({name: 'auditmodels'}).toArray(function (err, names) {
			if (err) throw err
			if (names.length === 0 ) {
				// auditmodels collection doesn't exists create it
				Object.keys(functionality).forEach(function (operation) {
					var auditmodel = new AuditModel({functionality: operation, counter: 0, model: auditedModel})
					auditmodel.save()
				})
				console.log('AuditModel inited..', AuditModel)
			}
		})
	})
}

exports.plugin = function (schema, options) {
	Object.entries(functionality).forEach(([key, value]) => {
		value.forEach(function (hook) {
			console.log('hook, key: ', hook, key)
			schema.pre(hook, function (next) {
				console.log('hook, key: ', hook, key)
				AuditModel.findOneAndUpdate({functionality: key}, {$inc: { counter: 1}}, {new: true}, function (err, doc) {
					if (err) {
						console.log('Something wrong when saving data!')
					}
				})
				next()
			})
		})
	})
}
