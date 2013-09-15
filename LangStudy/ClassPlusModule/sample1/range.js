/**
 * @author TonyGuu
 * 
 * DESC:【CASE 9.1】A class representing a range of values.
 * 
 */
var childFactory = require("./ChildFactory");

// This is a factory function.
// We can create,initialize and return the new object
function range(from, to) {
	// Use the inherit() function to create an object that inherits from the
	// prototype object defined below. The prototype object is stored as
	// a property of this function, and defines the shared methods (behavior)
	// for all range objects.
	var r = childFactory.inherit(range.methods);

	//Initialize the new created object
	// These are noninherited properties that are unique to this object.
	r.from = from;
	r.to = to;
	
	return r;
}

//Defines prototype object that contains methods inherited by all range objects.
range.methods = {
	// Return true if x is in the range, false otherwise
	// This method works for textual and Date ranges as well as numeric.
	includes : function(x) {
		return this.from <= x && x <= this.to;
	},
	// Invoke f once for each integer in the range.
	// This method works only for numeric ranges.
	foreach : function(f) {
		for ( var x = Math.ceil(this.from); x <= this.to; x++)
			f(x);
	},
	
	toString : function() {
		return "(" + this.from + "..." + this.to + ")";
	}
};


//Here are example uses of a range object.
var r = range(1,3); // Create a range object
console.log(r.includes(2));// => true: 2 is in the range
r.foreach(console.log); // Prints 1 2 3
console.log(r); // Prints (1...3)





