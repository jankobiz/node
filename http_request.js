var http = require('http');
var Promise = require('promise');

syncOutput(function () {		
	console.log('Lets try this approach!');
	getjson = getData(http);
	getJSONPromise = getData(http);
	//setTimeout(console.log(getjson.title),3000);
    getJSONPromise.then(function (data) {
		console.log(data);    // 'hello world’
	}, function (error) {
		console.error('uh oh: ', error);   // 'uh oh: something bad happened’
	});
});
//var greeting = sayHello();
//console.log(greeting);    // 'hello world’
//getDataReq(http);
//setTimeout(function () {
//		getDataReq(http);
//		console.log(' ');
//		console.log('Then timeout!');
//		console.log(' ');
//}, 1000);
//getData(http);
console.log(' ');
console.log('After GET!');
console.log(' ');

function syncOutput (callback) {
	callback();
	console.log('After callback!');
};

function sayHello() {
	return 'Hello world!';	
}

function getDataReq (http) {
	var options = {
	host: 'jsonplaceholder.typicode.com',
	port: '80',
	path: '/posts/1',
	method: 'GET',  
	headers: {
	    'Content-Type': 'application/json; charset=utf-8'
	}
	};
	var req = http.request(options, function(res) {
		// response is here
		res.on('data', function (chunk) {
			console.log('Requested with http.request() method ' + chunk);		
			jsonObject = JSON.parse(chunk);
			console.log(jsonObject.userId);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
	// write the request parameters
	req.write('post=data&is=specified&like=this');
	req.end();
};

function getData (http) {
	var requestedData;
	http.get('http://jsonplaceholder.typicode.com/posts/1', function (res) {
		console.log("Got response: " + res.statusCode);
		if(res.statusCode === 200) {
			console.log("Got value: " + res.statusMessage);
			//console.log("Got value: " + JSON.stringify(res));
			res.setEncoding('utf8');
			res.on('end', function () {
				console.log('Response ended');
				return requestedData;
			});
			res.on('data', function (chunk) {
				console.log(chunk);
				requestedData = chunk;
				jsonObject = JSON.parse(chunk);
				console.log(jsonObject.userId);
			});
		}
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});	
}

function findProperty(obj, name) {
    for (var prop in obj) {    
	var value = obj[prop];
	if (typeof value === 'object') {
	    if (prop === name){
		return result = value;
        }
        findProperty(value, name);
	} else {
	    if (prop === name) {
		result = value;
		return result;
	    }
	}
    }
}