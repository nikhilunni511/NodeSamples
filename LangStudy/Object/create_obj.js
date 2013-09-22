/**
 * @author TonyGuu
 * 
 * DESC:
 * 
 */

var empty = {}; // An object with no properties
var point = {
	x : 0,
	y : 0
}; // Two properties
var point2 = {
	x : point.x,
	y : point.y + 1
}; // More complex values
var book = {
	"main title" : "JavaScript", // Property names include spaces,
	'sub-title' : "The Definitive Guide", // and hyphens, so use string
											// literals
	"for" : "all audiences", // for is a reserved word, so quote
	author : { // The value of this property is
		firstname : "David", // itself an object. Note that
		surname : "Flanagan" // these property names are unquoted.
	}
};

//===========================
//create object with new
//===========================
var o = new Object(); // Create an empty object: same as {}.
var o1 = {};
var a = new Array(); // Create an empty array: same as [].
var d = new Date(); // Create a Date object representing the current time
var r = new RegExp("js"); // Create a RegExp object for pattern matching.

//===========================
//Prototype
//ch6.
//===========================


//===========================
//Object.create()
//===========================
var o1 = Object.create({x:1,y:2});//o1 inherits properties x and y

//create an empty object
var emptyObj = {};
var emptyObj2 = Object.create(null);
var emptyObj3 = new Object();


//===========================
//get and set and create Properties
//ch6.
//===========================
var author = book.author;
var name = author.surname;
var title = book["main title"];

book.edition = 6;//create an "edition" property of book
book["main title"] = "ECMAScript";//Set value

var pro = object.property;
var pro1 = object["property"];//pro = pro1

//======================================================
//objects in JS are associative arrays(or map/hash/dictionary)
//ch6.2.1
//======================================================

//use array notation to access properties
//of an object with string expressions.
var addr = "";
for(var i = 0; i < 4; i++) {
	addr += customer["address" + i] + '\n';
}

//the stockname will change at runtime
//so we cannot use . operator to access the properties of the portfolio obj
function addstock(portfolio, stockname, shares) {
	portfolio[stockname] = shares;
}
function getvalue(portfolio) {
	var total = 0.0;
	for (var stockname in portfolio) { // For each stock in the portfolio:
		var shares = portfolio[stockname]; // get the number of shares
		var price = getquote(stockname); // look up share price
		total += shares * price; // add stock value to total value
	}
	return total; // Return total value.
}

//======================================================
//Inheritance
//ch6.2.2
//======================================================

//Inherit from a inner obj:Object
var o = {}; // o inherits object methods from Object.prototype
o.x = 1; // and has an own property x.
var p = inherit(o); // p inherits properties from o and Object.prototype
p.y = 2; // and has an own property y.
var q = inherit(p); // q inherits properties from p, o, and Object.prototype
q.z = 3; // and has an own property z.
var s = q.toString(); // toString is inherited from Object.prototype
var res = q.x + q.y; // => 3: x and y are inherited from o and p

//Inherit from a customized obj:unitcircle
var unitcircle = { r:1 }; // An object to inherit from
var c = inherit(unitcircle); // c inherits the property r
c.x = 1; c.y = 1; // c defines two properties of its own
c.r = 2; // c overrides its inherited property
unitcircle.r; // => 1: the prototype object is not affected

//======================================================
//Property access errors
//ch6.2.3
//======================================================

// if book.subtitle doesnot exist,it may raise an exception
var len = undefined;
if (book) {
	if (book.subtitle)
		len = book.subtitle.length;
}
// A concise and idiomatic alternative to get subtitle length or undefined
var len = book && book.subtitle && book.subtitle.length;

//======================================================
//class Attribute
//ch6.8.2
//======================================================

function classof(o) {
	if (o === null)
		return "Null";
	if (o === undefined)
		return "Undefined";
	return Object.prototype.toString.call(o).slice(8, -1);
}

classof(null) // => "Null"
classof(1) // => "Number"
classof("") // => "String"
classof(false) // => "Boolean"
classof({}) // => "Object"
classof([]) // => "Array"
classof(/./) // => "Regexp"
classof(new Date()) // => "Date"
classof(window) // => "Window" (a client-side host object)
function f() {}; // Define a custom constructor
classof(new f()); // => "Object"

//======================================================
//Object methods
//object methods are defined on Object.prototype
//ch6.10
//======================================================
var s = { x:1, y:1 }.toString();



