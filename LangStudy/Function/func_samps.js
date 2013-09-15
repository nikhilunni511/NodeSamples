/**
 * @author TonyGuu
 * 
 * DESC:
 * 
 */
//Create an object instance
var obj = {
	a : 0,
	b : "abc"
};

//Case 1 : Define a function
//TO print the properties of an object
function printProps(obj){
	for(var pro in obj){
		console.log(pro + ":" + obj[pro]);
	}
}

//Invoke the printProps(obj)
printProps(obj);

//Case 2 : Define an anonymous function(匿名函数)
var square = function(x){ return x*x; };

//Case 3 : Define an function with func name
var f = function fact(x) {
	if (x <= 1)
		return 1;
	else
		return x * fact(x - 1);
};

//Case 4 : Function expressions is used as arguments to other functions:
//data.sort(function(a, b) {
//	return a - b;
//});

//Case 5 : Function expressions are defined and immediately invoked:
var tensquared = (function(x) {
	return x * x;
}(10));
console.log(tensquared);

//============================
//NOTE1 : IF FUNCTIONS ARE USED ONLY ONCE,
//WE CAN DEFINE IT AS Case4 and Case5(a kind of anonymous function(匿名函数))
//============================

//============================
//NOTE2 : ABOUT THE 'return'
//If a function does not contain a return statement, 
//it simply executes each statement in the function body and returns
//the 'undefined' value to the caller.
//============================

//Case 6 : Nested Functions(嵌套函数)
function hypotenuse(a, b) {
	function square(x) {
		return x * x;
	}
	return Math.sqrt(square(a) + square(b));
}
//============================
//NOTE3:variable scoping rules
//square function can use the a,b parameter
//PLS refer to Closure part
//============================

/*
function declaration statements are not true statements, and the
ECMAScript specification only allows them as top-level statements. They can appear
in global code, or within other functions, but they cannot appear inside of loops, conditionals,
or try/catch/finally or with statements.1 Note that this restriction applies
only to functions declared as statements. Function definition expressions may appear
anywhere in your JavaScript code.
*/

//Case 7 : Method Invocation
var calculator = {
	operand1 : 1,
	operand2 : 1,
	add : function() {
		// Note the use of the this keyword to refer to this object.
		this.result = this.operand1 + this.operand2;
	}
};
calculator.add();//invoke the add method of the object
calculator.result; // => 2

//'this'
var o = { // An object o.
	m : function() { // Method m of the object.
		var self = this; // Save the this value in a variable.
		console.log(this === o); // Prints "true": this is the object o.
		f(); // Now call the helper function f().
		function f() { // A nested function f
			console.log(this === o); // "false": this is global or undefined
			console.log(self === o); // "true": self is the outer this value.
		}
	}
};
o.m();

//Case 8 : Constructor Invocation

//【Case 8.3.1】 Optional Parameters

// Append the names of the enumerable properties of object o to the
// array a, and return a. If a is omitted, create and return a new array.
function getPropertyNames(o, /* optional */a) {
	
	if (a === undefined)
		a = []; // If undefined, use a new array
				// we can use : a = a || [];
	for ( var property in o)
		a.push(property);
	return a;
}
console.log(getPropertyNames(obj));
var arr = [];
console.log(getPropertyNames(obj, arr));

//【Case 8.3.3】Using Object Properties As Arguments

// Copy length elements of the array from to the array to.
// Begin copying with element from_start in the from array
// and copy that element to to_start in the to array.
// It is hard to remember the order of the arguments.
function arraycopy(/* array */from, /* index */from_start,
					/* array */to, /* index */to_start,
					/* integer */length) {
	// code goes here
}
// This version is a little less efficient, but you don't have to
// remember the order of the arguments, and from_start and to_start
// default to 0.
function easycopy(args) {
	arraycopy(args.from, 
			args.from_start || 0, // Note default value provided
			args.to, args.to_start || 0, 
			args.length);
}
// Here is how you might invoke easycopy():
var a = [ 1, 2, 3, 4 ], b = [];
easycopy({
	from : a,
	to : b,
	length : 4
});

//【Case 8.3.4】check argument types
function func(arg){
	
	if(arg == null){
		//codes
	}
	if(isArray(arg)){
		//codes
	}
	if(typeof arg === "function"){
		//check arg is a function,if yes,we may invoke the func as this
		arg();
	}
	if(typeof arg === "object"){
		
	}
	if(isNaN(arg)){
		//arg couldnot convert to a number
	}
}

//【Case 8.4】Function as Values

function square(x){
	return x*x;
}

//In JS,functions can be assigned to variables
var s = square;
square(4);
s(4);

//stored in the properties of objects
var obj = {square : function(x){ return x*x;}};
var x = obj.square(4);

//stored in the elements of arrays
var arr = [function(x){ return x*x;}, 20];
arr[0](4);

//passed as arguments to functions




//【Case 8.4.1】Define own function properties


/**
 * NOTE:
 * You could store this information
in a 'global variable', but that is unnecessary, because the information is used only by
the function itself,so we store it in the 'function properties'.
 */
// Initialize the counter property of the function object.
// Function declarations are hoisted so we really can
// do this assignment before the function declaration.
uniqueInteger.counter = 1;
// This function returns a different integer each time it is called.
// It uses a property of itself to remember the next value to be returned.
// the counter just like the static value in java
function uniqueInteger() {
	return uniqueInteger.counter++; // Increment and return counter property
}
console.log(uniqueInteger());//1
console.log(uniqueInteger());//2
console.log(uniqueInteger());//3


//the following factorial() function that uses properties
//of itself (treating itself as an array) to cache previously computed results:
//Compute factorials and cache results as properties of the function itself.
function factorial(n) {
	if (isFinite(n) && n > 0 && n == Math.round(n)) { // Finite, positive ints
														// only
		if (!(n in factorial)) // If no cached result
			factorial[n] = n * factorial(n - 1); // Compute and cache it
		return factorial[n]; // Return the cached result
	} else
		return NaN; // If input was bad
}
factorial[1] = 1; // Initialize the cache to hold this base case.

//【Case 8.7.1】The length Property

// This function uses arguments.callee, so it won't work in strict mode.
function check(args) {
	var actual = args.length; // The actual number of arguments
	console.log("actual" + actual);
	var expected = args.callee.length; // The expected number of arguments
	console.log("expected" + expected);
//	if (actual !== expected) // Throw an exception if they differ.
//		throw Error("Expected " + expected + "args; got " + actual);
}
function f8(x, y, z) {
	check(arguments); // arguments will encapsulate the args 
	return x + y + z;
}
f8(1,2);
f8(1,2,3);

//【Case 8.7.4】The bind() Method

//bind() is to bind a function to an object
function f874(y) {
	return this.x + y;
} // This function needs to be bound
var o874 = {
	x : 1
}; // An object we'll bind to
var g874 = f874.bind(o874); // Calling g(x) invokes o.f(x)
g874(2); // => 3





