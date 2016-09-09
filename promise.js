var val1 = 'Value1 ';
var val2 = 'Value2 ';
var anotherValue = 'Another callback';

var fs = require("fs");
var promise = require('promise');
var readFile = promise.denodeify(require('fs').readFile);

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

check(function (anotherValue, value) {
    console.log(anotherValue + value + ' which is async!\n');
});

retrieveContent('input1.txt');