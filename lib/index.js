var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test')

var auditSchema = new Schema({
	model: String,
	counter: Number,
	functionality: String
})

var functionality = ['save', 'remove', 'update', 'find']

var AuditModel = mongoose.model('AuditModel', auditSchema)
// check audit collection already exists
mongoose.connection.on('open', function () {
	mongoose.connection.db.listCollections({name: 'auditmodels'}).toArray(function (err, names) {
		if (err) throw err
		if (names.length === 0 ) {
			// auditmodels collection doesn't exists create it
			functionality.forEach( function (operation) {
				new AuditModel({functionality: operation, counter: 0, model: 'Blog'}).save()
			})
			console.log('after insertModel save..')
		}
	})
})

module.exports = exports = function audit (schema, options) {

	schema.pre('save', function (next) {
		console.log('save event..')
		AuditModel.findOneAndUpdate({functionality: 'save'}, {$inc: { counter: 1}}, {new: true}, function (err, doc) {
			if (err) {
				console.log('Something wrong when saving data!')
			}
		})
		next()
	})

	schema.pre('remove', function (next) {
		console.log('remove event..')
		AuditModel.findOneAndUpdate({functionality: 'remove'}, {$inc: { counter: 1}}, {new: true}, function (err, doc) {
			if (err) {
				console.log('Something wrong when remove data!')
			}
		})
		next()
	})

	schema.pre('findOneAndRemove', function (next) {
		console.log('findOneAndRemove event..')
		AuditModel.findOneAndUpdate({functionality: 'remove'}, {$inc: { counter: 1}}, {new: true}, function (err, doc) {
			if (err) {
				console.log('Something wrong when remove data!')
			}
		})
		next()
	})

	schema.pre('find', function (next) {
		console.log('find event..')
		AuditModel.findOneAndUpdate({functionality: 'find'}, {$inc: { counter: 1}}, {new: true}, function (err, doc) {
			if (err) {
				console.log('Something wrong when find data!')
			}
		})
		next()
	})

	schema.pre('findOne', function (next) {
		console.log('findOne event..')
		AuditModel.findOneAndUpdate({functionality: 'find'}, {$inc: { counter: 1}}, {new: true}, function (err, doc) {
			if (err) {
				console.log('Something wrong when find data!')
			}
		})
		next()
	})

	schema.pre('update', function (next) {
		console.log('update event..')
		AuditModel.findOneAndUpdate({functionality: 'update'}, {$inc: { counter: 1}}, {new: true}, function (err, doc) {
			if (err) {
				console.log('Something wrong when updating data!')
			}
		})
		next()
	})

	schema.pre('findOneAndUpdate', function (next) {
		console.log('findOneAndUpdate event..')
		AuditModel.findOneAndUpdate({functionality: 'update'}, {$inc: { counter: 1}}, {new: true}, function (err, doc) {
			if (err) {
				console.log('Something wrong when findOneAndUpdate data!')
			}
		})
		next()
	})
}
