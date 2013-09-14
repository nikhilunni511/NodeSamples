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
data.sort(function(a, b) {
	return a - b;
});

//Case 5 : Function expressions are sometimes defined and immediately invoked:
var tensquared = (function(x) {
	return x * x;
}(10));
console.log(tensquared);

//============================
//NOTE : IF FUNCTIONS ARE USED ONLY ONCE,
//WE CAN DEFINE IT AS Case4 and Case5(a kind of anonymous function(匿名函数))
//============================





