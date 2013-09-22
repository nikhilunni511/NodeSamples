/**
 * @Author TonyGuu
 * 
 * @Time ${time}
 * 
 * @Desc
 * 
 */
var basketModule = (function() {
	var basket = []; // private attribute
	function doSomethingPrivate() { //private method
		// ...
	}
	function doSomethingElsePrivate() {
		// ...
	}
	return {// exposed to public
		addItem : function(item) {
			basket.push(item);
		},
		getItemCount : function() {
			return basket.length;
		},
		doSomething : doSomethingPrivate,
		getTotal : function() {
			var q = this.getItemCount();
			var price = 0;
			while (q--) {
				price += basket[q].price;
			}
			return price;
		}
	};

}());

// basketModule is an object with properties which can also be methods
basketModule.addItem({
	item : 'bread',
	price : 0.5
});
basketModule.addItem({
	item : 'butter',
	price : 0.3
});
console.log("Item counts = "+basketModule.getItemCount());
console.log("Total price = "+basketModule.getTotal());
// the following will not work:
//console.log(basketModule.basket); // (undefined as not inside the returned
									// object)
//console.log(basket); // (only exists within the scope of the closure)
