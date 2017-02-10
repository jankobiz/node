var fs = require("fs");
readFile();
console.log('\n\nAfter File Read!!!!!!!!!!!!!!!!!\n\n\n');
var points = [40, 100, 11, 5, 25, 10];
points.forEach(function(item){	
    setTimeout(function(){console.log(item);}, 1000);
});
console.log('Hello');
setTimeout(function () {
   console.log('middle'); 
}, 1000);
console.log('last');
console.log(' ');
console.log(' ');

function foo() {
    bar(function(returnValue) {
		for (i = 0; i < 10; i++) {
			console.log('Loop number ' + i);
		}
//	setTimeout(function(){console.log('Waited 1 sec')}, 1000);
		console.log('Value ' + returnValue);
    });
    console.log('Async Value');
}

function bar(callback) {
	callback("bar function");
	console.log('Bar Value');
}
foo();
console.log('Second');

fs.readFile('input.txt', function (err, data) {
    if (err) {
		return console.error(err);
    } else {
	console.log(data.toString() + '\n');
	console.log("Program Ended 1");
	check(function (anotherValue) {
	    console.log(anotherValue);
	});
    }
});

check(function (anotherValue) {
    console.log(anotherValue + ' which is async!\n');
});

function check (callback) {
    callback ("Another callback test");
}
console.log("Program Ended");

var deep_thought = { 
    the_answer: 402,
    ask_question: function (callback) {
        callback ("402 callback function!\n");
        console.log('Code execution continues\n');
        return this.the_answer;
    }
};

function level1 (anotherValue1, callback) {
    console.log(anotherValue1 + ' which is async!\n');
    callback('Callback level 1\n');
    console.log('Level 1111 function after callback!\n');    
}

function level2 (anotherValue2, callback) {
    console.log(anotherValue2 + ' which is async!\n');
    callback('Callback level 2');
    console.log('Level 2222 function after callback!\n');
}

var the_meaning = deep_thought.ask_question(function (value) {
    fs.readFile('input1.txt', function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            console.log(data.toString() + ' !!!!!!!********');
            level1('Call to Level 1 function ', function (data) {
                level2('Call to Level 2 function ', function (data) {
                    console.log('Before file read\n');
                    console.log(data.toString() + " and that's it!\n" );
                    console.log('After file read\n');
                });
				console.log('Level 1 after call to level 2!');
            });
            console.log(value);
        }
    });
    console.log('\nCheck this out man!!!!!!!\n');
});

function readFile () {    
    var buf = fs.readFileSync('input1.txt', "utf8");
    console.log("\n--------- SYNC ---------");
    console.log("--------- " + buf + " ---------");
    console.log("--------- SYNC ---------\n");
    console.log('After Synchronious file read...\n');
    setTimeout(function () {
        console.log('Waiting 1 second before file read...\n'); 
    }, 1000);
}

console.log('End of the end!');
console.log(the_meaning);