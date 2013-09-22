/**
 * @Author TonyGuu
 * 
 * @Time ${time}
 * 
 * @Desc
 * The sample covers namespace,public&private method,inherit and override method
 * 
 */
var myNamespace = (function() {
	var myPriAttribute = 0;//private attribute
	var myPriMethod = function(args) {//private method
		console.log(args);
	};
	var myPriMethod2 = function(){
		console.log("myPriMethod2 in myNamespace");
	};
	return {//exposed to public
		myPubAttribute : "foo", //public attribute
		myPubMethod1 : function(args) {
			myPriAttribute++;
			myPriMethod(args);
		},
		myPubMethod2 : myPriMethod2//public method
	};
	
}());// use this style

myNamespace.myPubMethod1("simple text");
//myNamespace.myPrivateMethod();//cannot access the method

myNamespace.myPubMethod2();

//Inherit and override
var myNamespace2 = Object.create(myNamespace);
myNamespace2.myPubMethod2 = function(){
		console.log("myPubMethod2 in myNamespace2");
};
myNamespace2.myPubMethod2();
myNamespace2.myPubMethod1("I'm pubMethod1");

