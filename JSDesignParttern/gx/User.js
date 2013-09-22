/**
 * @Author TonyGuu
 * 
 * @Time ${time}
 * 
 * @Desc
 *
 */
function User(uid,name,sex){
	this.uid = uid;
	this.name = name;
	this.sex = sex;
}

//Override the toString()
User.prototype.toString = function(){
	return this.uid + "," + this.name + "," + this.sex;
};

var u1 = new User(111,'Tony','m');
var u2 = new User(112,'Hellen','f');

console.log(u1.toString());
