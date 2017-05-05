'use strict';

const express = require('express');
const path = require('path');

global.Vue = require('vue');

// Get the HTML layout
//const layout = fs.readFileSync('./index.html', 'utf8');
// Create a renderer
const renderer = require('vue-server-renderer').createRenderer();

// App
const server = express();

// Serve files from the assets directory
//server.use('/assets', express.static(
//	path.resolve(__dirname, 'assets')
//));
//
//app.get('/', function(req, res){
//	res.send("haaiii");
//});
//
//// Listen on port 5000
//server.listen(3000, error => {
//	if (error) throw error;
//
//	console.log('Server is running at localhost:3000');
//});


var MongoClient = require('mongodb').MongoClient
	,assert = require('assert');

// Connection URL
var url = `mongodb://mongo:27017/MEVN`;

var insertDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([
		{a : 1}, {a : 2}, {a : 3}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the collection");
		callback(result);
	});
}

var findDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find some documents
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs)
		callback(docs);
	});
}

var updateDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Update document where a is 2, set b equal to 1
	collection.updateOne({ a : 2 }
		,{ $set: { b : 1 } }, function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log("Updated the document with the field a equal to 2");
			callback(result);
		});
}

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	db.close();

	//insertDocuments(db, function() {
	//	updateDocument(db, function() {
	//		db.close();
	//	});
	//});
});