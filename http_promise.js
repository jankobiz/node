/* global promiseCount, promise2 */

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
	return p2;
}

function testPromise (i) {
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
	return p1;
}

for (i=1; i<=2; i++){
	testPromise(i);
}


var firstPromiseTest = function (){
	var p3 = new Promise (
		function (resolve, reject){
			resolve(promise2);
		}
	);	
	return p3;
};

var secondtPromiseTest = function (promise2){
	var p3 = new Promise (
		function (resolve, reject){
			resolve(promise2);
		}
	);	
	return p3;
};

var firstMethod = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('first method completed');
         resolve({data: '123'});
      }, 2000);
   });
   return promise;
};
 
 
var secondMethod = function(someStuff) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('second method completed');
         resolve({newData: someStuff.data + ' some more data'});
      }, 2000);
   });
   return promise;
};
 
var thirdMethod = function(someStuff) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('third method completed ' + someStuff.newData);
         resolve({result: someStuff.newData});
      }, 4100);
   });
   return promise;
};
 
var final = firstMethod()
   .then(secondMethod)
   .then(thirdMethod)
   .then(function(val){
			console.log('\n' + val.result.someStuff.newData +') Promise code termination done)\n');
		});