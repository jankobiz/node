var val1 = 'Value1 ';
var val2 = 'Value2 ';
var anotherValue = 'Another callback';

var fs = require("fs");
var promise = require('promise');
var readFile = promise.denodeify(require('fs').readFile);
var httpGet = promise.denodeify(require('http').get);

fs.readFile('input.txt', function (err, data) {
    if (err) {
		return console.error(err);
    } else {
	console.log(data.toString() + '\n');
	check(function (val1, val2) {
	    console.log(val1);
	});
    }
});

function check (callback) {
    callback (val1, val2);
}

function retrieveContent (filename) {
	readFile(filename, 'utf-8').then(function (data) {
		console.log(data);
		console.log('Acync thing doesn\'t work here');
	});
	console.log('Acync thing works');
}

function getData () {
	var requestedData;
	httpGet('http://jsonplaceholder.typicode.com/posts/1').then(function (data) {
		console.log("Got response: " + data.statusCode);
//		if(res.statusCode === 200) {
//			console.log("Got value: " + res.statusMessage);
//			//console.log("Got value: " + JSON.stringify(res));
//			res.setEncoding('utf8');		
//			res.on('end', function () {
//				console.log('Response ended');
//				return requestedData;
//			});
//			res.on('data', function (chunk) {
//				console.log(chunk);
//				requestedData = chunk;
//				jsonObject = JSON.parse(chunk);
//				console.log(jsonObject.userId);
//			});
//		}
	});
	console.log('Acync HTTP');
}

check(function (anotherValue, value) {
    console.log(anotherValue + value + ' which is async!\n');
});

retrieveContent('input1.txt');
getData();