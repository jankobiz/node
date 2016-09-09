var val1;
var val2 = 'Value2 ';
var anotherValue = 'Another callback';

var fs = require("fs");
var Promise = require('promise');

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

check(function (anotherValue, value) {
    console.log(value + anotherValue + ' which is async!\n');
});

function check (callback) {
    callback (val1, val2);
}