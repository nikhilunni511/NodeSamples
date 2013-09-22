/**
 * @Author TonyGuu
 * 
 * @Time ${time}
 * 
 * @Desc
 *
 */
//A car class
function Car(model){
	this.model = model;
	this.color = 'silver';
	this.year = '2012';
	this.getInfo = function () {
		return this.model + ' ' + this.year;
	};
}


if(false){
	//Test1:new object and set property value
	var myCar = new Car('ford');
	myCar.year = '2010';
	console.log(myCar.getInfo());
	//Test2:add property(dot is prefered)
	myCar.place = "Sh";
	console.log(myCar.place);
	myCar["owner"] = "Tony";
	console.log(myCar["owner"]);

	console.log(myCar);
}

if(false){
	//Test3:class and subclass
	
	var defineProp = function(obj, key, value) {
		config = {};
		config.value = value;
		Object.defineProperty(obj, key, config);
	};
	//Create a new empty object
	var man = Object.create(null);
	// Populate the object with properties
	defineProp( man, 'car', 'Delorean' );
	defineProp( man, 'dob', '1981' );
	defineProp( man, 'beard', false );
	defineProp( man, 'toString', function(){
		return "Car:"+man.car+",Dob:"+man.dob+",Beard"+man.beard;
	});

	var driver = Object.create(man);//inherit from man
	defineProp( driver, 'topSpeed', '100mph');
	defineProp( driver, "toString", function(){
		return man.toString() + ",TopSpeed:"+driver.topSpeed;
	});
	console.log(driver.car);
	console.log(driver.topSpeed);
	console.log(man.toString());
	console.log(driver.toString());
}











