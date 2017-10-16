var mongoose = require('mongoose')
var Schema = mongoose.Schema
var audit = require('../../lib/index')

var blogSchema = new Schema({
	name: String,
	title: String
})

var connection = mongoose.createConnection('mongodb://localhost/test')

audit.initialize(connection, 'Blog')
blogSchema.plugin(audit.plugin)

setTimeout(function () {

	var Blog = connection.model('Blog', blogSchema)
	var article = new Blog({title: 'test Title1', name: 'testname'})

	article.save()

	Blog.find({}, function (err, result) {
		if (err) throw err
		console.log('found result: ', result)
	})

	Blog.findOneAndUpdate({name: 'testname'}, {title: 'uj title'}, {upsert: true}, function (err, doc) {
		if (err) throw err
		console.log('updated.. ', doc)
	})

}, 5000)
