var mongoose = require('mongoose')
var Schema = mongoose.Schema
var audit = require('../../lib/index')

var blogSchema = new Schema({
	name: String,
	title: String
})

blogSchema.plugin(audit)

mongoose.connect('mongodb://localhost/test')

var Blog = mongoose.model('Blog', blogSchema)

var article = new Blog({title: 'test Title1', name: 'lófasz'})

article.save()
