/**
 * @author TonyGuu
 * 
 * DESC:closure
 * 
 */

//Case 8.6 closure

//Case 3.10 Variable Scope
var scope = "global"; // Declare a global variable
function checkscope() {
	var scope = "local"; // Declare a local variable with the same name
	return scope; // Return the local value, not the global one
}
checkscope(); // => "local"

//------------
scope = "global"; // Declare a global variable, even without var.
function checkscope2() {
	scope = "local"; // Oops! We just changed the global variable.
	myscope = "local"; // This implicitly declares a new global variable.
	return [ scope, myscope ]; // Return two values.
}
checkscope2(); // => ["local", "local"]: has side effects!
console.log(scope); // => "local": global variable has changed.
console.log(myscope); // => "local": global namespace cluttered up.

//-------nested function
var scope = "global scope"; // A global variable
function checkscope() {
	var scope = "local scope"; // A local variable
	function nested() {
		var scope = "nested scope"; // A nested scope of local variables
		return scope; // Return the value in scope here
	}
	return nested();
}
checkscope(); // => "nested scope"

//----There is no block scope in JS
function test(o) {
	var i = 0; // i is defined throughout function
	if (typeof o == "object") {
		var j = 0; // j is defined everywhere, not just block
		for ( var k = 0; k < 10; k++) { // k is defined everywhere, not just
										// loop
			console.log(k); // print numbers 0 through 9
		}
		console.log(k); // k is still defined: prints 10
	}
	console.log(j); // j is defined, but may not be initialized
}

//-----hoisted
var scope = "global";
function f() {
	console.log(scope); // Prints "undefined", not "global"
						// the scope variable is defined but not initialized
	var scope = "local"; // Variable initialized here, but defined everywhere
	console.log(scope); // Prints "local"
}

function f() {
	var scope; // Local variable is declared at the top of the function
	console.log(scope); // It exists here, but still has "undefined" value
	scope = "local"; // Now we initialize it and give it a value
	console.log(scope); // And here it has the value we expect
}










