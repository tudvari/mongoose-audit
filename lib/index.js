'use strict'
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
	var collectionName = 'Audit_' + auditedModel
	AuditModel = connection.model('AuditModel', auditSchema, collectionName)
	connection.on('open', function () {
		connection.db.listCollections({name: 'auditmodels'}).toArray(function (err, names) {
			if (err) throw err
			if (names.length === 0 ) {
				// auditmodels collection doesn't exists create it
				Object.keys(functionality).forEach(function (operation) {
					var auditmodel = new AuditModel({functionality: operation, counter: 0 })
					auditmodel.save()
				})
			}
		})
	})
}

exports.plugin = function (schema, options) {
	if (!AuditModel) throw new Error('Plugin initialize missing or failed..')

	Object.entries(functionality).forEach(([key, value]) => {
		value.forEach(function (hook) {
			schema.pre(hook, function (next) {
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
