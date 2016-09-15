/* global promiseCount */

var fs = require("fs");
var Promise = require('Promise');
var readFile = Promise.denodeify(require('fs').readFile);
var httpGet = Promise.denodeify(require('http').get);

var promiseCount = 0;

console.log('Acync thing works 1');

fs.readFile('input.txt', function (err, data) {
    if (err) {
		return console.error(err);
    } else {
		console.log('File read\n');
		console.log(data.toString() + '\n');
		console.log('After file was read\n');
    }
});

retrieveContent('input1.txt');
console.log('Acync thing works 2');
console.log('Acync thing works 3');

function retrieveContent (filename) {
	readFile(filename, 'utf-8').then(function (data) {
		console.log(data.toString() + '\n');
		console.log('Acync thing doesn\'t work here\n');
	});
	console.log('Acync thing works!\n');
	var p2 = new Promise (
		function (resolve, reject){
			resolve(filename);
		}
		return promise;
	);
	p2.then(
			function(val) {
				fs.readFile(val, function (err, data) {
					if (err) {
						return console.error(err);
					} else {
						console.log('Promise 2 file read\n');
						console.log(data.toString() + '\n');
						console.log('Promise 2 file was red\n');
					}
				});
			}
		);
	p2.then(
			function(val) {
				setTimeout(console.log('Promise 3 should be logged last - file name ' + val + '\n'), 5000);
			}			
		);
}

function anotherPromiseTest(promise2){
	var p3 = new Promise (
		function (resolve, reject){
			resolve(filename);
		}
		return promise;
	);
}

function testPromise () {
	//var thisPromiseCount = ++promiseCount;
	var thisPromiseCount = i;
	console.log('\n\n' + thisPromiseCount + ') Promise started (Sync code started)');
	var p1 = new Promise (
		function (resolve, reject) {
			var timeoutValue = Math.random() * 2000 + 1000;
			if(i===1) timeoutValue = 0;
			console.log(thisPromiseCount + ') Promise started (Async code started) - Timeout value ' + timeoutValue + ' ms\n');
		    // This is only an example to create asynchronism			
			setTimeout(function() {
				// We fulfill the promise !
		        resolve(thisPromiseCount);
			}, timeoutValue);
		}
	);
	p1.then(
		function(val){
			console.log('\n' + val +') Promise fulfilled (Async code terminated)\n');
		})
	.catch(
		function(reason) {
            console.log('Handle rejected promise ('+reason+') here.');
	});
	console.log(thisPromiseCount + ') Promise made (Sync code terminated)');
}

for (i=1; i<=2; i++){
	testPromise(i);
}