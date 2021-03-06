# mongoose-query-counter

Query counter for mongoosejs

[![Maintainability](https://api.codeclimate.com/v1/badges/9629572e791f04d7947d/maintainability)](https://codeclimate.com/github/tudvari/mongoose-query-counter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9629572e791f04d7947d/test_coverage)](https://codeclimate.com/github/tudvari/mongoose-query-counter/test_coverage)

## Features

- Query type counter: You are able to measure, the queries on your collection by type.

### Installation

```sh
npm install mongoose-query-counter
```
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
