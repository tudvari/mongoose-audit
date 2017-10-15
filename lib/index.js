var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test')

var auditSchema = new Schema({
	modelName: String,
	counter: Number,
	functionality: String
})

var AuditModel = mongoose.model('AuditModel', auditSchema)
var insertModel = new AuditModel({functionality: 'insert', counter: 0, modelName: 'Blog'})

insertModel.save()

module.exports = exports = function audit (schema, options) {

	schema.pre('save', function (next) {
		console.log('save event..')
		next()
	})
}
