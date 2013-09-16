/**
 * @author TonyGuu
 * 
 * [guide]
 * 1.There is a bug here
 * 2.till now,i think assert is better
 */
var should = require("should");

describe('Array', function(){
  describe('#push()', function(){
    it('should append a value', function(){
      var arr = [];
      arr.push('foo');
      arr.push('bar');
      arr.push('baz');
      ['foo', 'bar', 'baz'].should.eql(arr);
      'foo'.should.eql(arr[0]);
    });//end it

    it('should return the length', function(){
      var arr = [];
      arr.push('foo').should.eql(1);
    });//end it
    
  });
});

describe('Array', function(){
  describe('#pop()', function(){
    it('should remove and return the last value', function(){
      var arr = [1, 2, 3];
      arr.pop.should.equal(3);
      arr.pop.should.equal(2);
      arr.pop.should.equal(1);
    });//end it

    it('should adjust .length', function(){
      var arr = [1,2,3];
      arr.pop();
      arr.length.should.equal(2);
    });//end it
    
  });
});
