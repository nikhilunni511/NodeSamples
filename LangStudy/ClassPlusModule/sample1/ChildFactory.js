/**
 * @author TonyGuu
 * 
 * DESC:【CASE 9.1】A class representing a range of values.
 * 
 */
// inherit() returns a newly created object that inherits properties from the
// prototype object p. It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(prototype) {
	if (prototype == null)
		throw TypeError(); // p must be a non-null object
	if (Object.create) // If Object.create() is defined...
		return Object.create(prototype); // then just use it.
	var t = typeof prototype; // Otherwise do some more type checking
	if (t !== "object" && t !== "function")
		throw TypeError();
	function f() {}; // Define a dummy constructor function.
	f.prototype = prototype; // Set its prototype property to p.
	return new f(); // Use f() to create an "heir" of p.
}

exports.inherit = inherit;