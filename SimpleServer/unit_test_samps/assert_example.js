/**
 * @author TonyGuu
 * 
 * This is a good example for us.
 * 
 * [guide]
 * 1.right click the 'assert_example.js',
 * choose the 'StartExplorer> Start shell here',
 * and execute 'mocha assert_example.js'
 * 
 */
var assert = require("assert");

describe('Array', function(){
  describe('#push()', function(){
    it('should append a value', function(){
      var arr = [];
      arr.push('foo');
      arr.push('bar');
      arr.push('baz');
      assert('foo' == arr[0]); // to test indentation
      assert('bar' == arr[1]);
      assert('baz' == arr[2]);
    });//end it

    it('should return the length', function(){
      var arr = [];
      assert(1 == arr.push('foo'));
      assert(2 == arr.push('bar'));
      assert(3 == arr.push('baz'));
    });//end it
    
  });
});

describe('Array', function(){
  describe('#pop()', function(){
    it('should remove and return the last value', function(){
      var arr = [1,2,3];
      assert(arr.pop() == 3);
      assert(arr.pop() == 2);
      assert(arr.pop() == -1);
    });//end it

    it('should adjust .length', function(){
      var arr = [1,2,3];
      arr.pop();
      assert(arr.length == 2);
    });//end it
    
  });
});
