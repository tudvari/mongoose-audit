# mongoose-query-counter

Query counter for mongoosejs

## Features

- Query type counter: You are able to measure, the queries on your collection by type.

## Usage

```javascript
	var mongoose = require('mongoose')
	var Schema = mongoose.Schema
	var audit = require('mongoose-audit')

	var blogSchema = new Schema({
		name: String,
		title: String
	})

	var connection = mongoose.createConnection('mongodb://localhost/test')

	audit.initialize(connection, 'Blog')
	blogSchema.plugin(audit.plugin)

	var  = connection.model('Blog', blogSchema)
	var article = new Blog({title: 'test Title1', name: 'testname'})

```

### Results

Every schema has a collection with the prefix Audit_. This collection collects the call numbers for every query type.

#### Example record from Audit collection

```json
	{
	    "functionality" : "save",
	    "counter" : 1
	}
```
