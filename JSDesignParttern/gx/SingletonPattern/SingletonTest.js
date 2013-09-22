/**
 * @Author TonyGuu
 * 
 * @Time ${time}
 * 
 * @Desc
 * A Singleton Pattern Sample
 *
 */
var SingletonTester = (function() {
	// options: an object containing configuration options for the singleton
	// e.g var options = { name: 'test', pointX: 5};
	function Singleton(options) {
		// set options to the options supplied or an empty object if none
		options = options || {};
		// set the name parameter
		this.name = options.name || 'default name';
		// set the value of pointX
		this.pointX = options.pointX || 6;
		// set the value of pointY
		this.pointY = options.pointY || 10;

	}
	// this is our instance holder
	var instance;
	// this is an emulation of static variables and methods
	var _static = {
		
		getInstance : function(options) {
			if (instance === undefined) {
				instance = new Singleton(options);
			}
			return instance;
		}
	};
	return _static;
	
})();

var singletonIns = SingletonTester.getInstance({
	name : 'a singleton sample',
	pointX : 5
});
console.log(singletonIns.pointX); // outputs 5
console.log(singletonIns.pointY);
console.log(singletonIns.name);
