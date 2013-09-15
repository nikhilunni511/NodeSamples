/**
 * @author TonyGuu
 * 
 * DESC:
 * 
 */
var p = {x:0};//Define a prototype object.
var p2 = {x:1,y:2};
var o = Object.create(p);//Create an object o with that prototype p.
						 //inherit the property of the prototype object
var d = new Date();
var a = new Array();

console.log(p.isPrototypeOf(o));//o inherits from p
console.log(Object.prototype.isPrototypeOf(o));//p inherits from Object.prototype
console.log(Object.getPrototypeOf(p));//{}
console.log(Object.getPrototypeOf(p2));//{}
console.log(Object.getPrototypeOf(o));//{ x: 0 }
console.log(Object.getPrototypeOf(d));//Invalid Date
console.log(Object.getPrototypeOf(a));//[]