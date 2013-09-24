/**
 * Created with JetBrains WebStorm.
 * User: zhaogang
 * Date: 13-9-2
 * Time: 下午6:47
 * To change this template use File | Settings | File Templates.
 */
var assert = require("assert")

describe('login', function(){
    describe('SinaLogin', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
})

