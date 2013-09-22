/**
 * @Author TonyGuu
 * 
 * @Time ${time}
 * 
 * @Desc
 * cannot invoke the method with arguments
 */
var myNamespace = (function() {
	
	var myPriAttribute = 0;//private attribute
	
	function myPriMethod(args) {//private method
		console.log(args);
	}
	
	function myPriMethod2(){
		console.log("myPriMethod2 in myNamespace");
	}
	
	return {//exposed to public
		myPubAttribute : "foo",
		myPubMethod : myPriMethod,
		myPubMethod2 : myPriMethod2
	};
	
}());// use this style

myNamespace.myPubMethod("simple text");
//myNamespace.myPrivateMethod();//cannot access the method

myNamespace.myPubMethod2();

//Inherit and override
var myNamespace2 = Object.create(myNamespace);
myNamespace2.myPubMethod2 = function(){
		console.log("myPubMethod2 in myNamespace2");
};
myNamespace2.myPubMethod2();
myNamespace2.myPubMethod("I'm pubMethod1");