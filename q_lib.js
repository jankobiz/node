var Q = require('q');
var http = require('http');
var url = require('url');

var httpGet = function (opts) {
     var deferred = Q.defer();
     http.get(opts, deferred.resolve);
     return deferred.promise;
};

httpGet();
httpGet(url.parse("http://jsonplaceholder.typicode.com/posts/1")).then(function (res) {
	console.log(res.statusCode);  // maybe 302
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log(chunk);
		requestedData = chunk;
		jsonObject = JSON.parse(chunk);
		console.log(jsonObject.userId);
	});
	console.log('Acync works');
    return httpGet(url.parse(res.headers["location"]));
}).then(function (res) {
    console.log(res.statusCode);  // maybe 200
	console.log('Second branch');
});