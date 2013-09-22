/**
 * @Author TonyGuu
 * 
 * @Time ${time}
 * 
 * @Desc
 *
 */
function People(name,sex,birthday){
	this.name = sex;
	this.sex = sex;
	this.birthday = birthday;
}

People.prototype.toString = function(){
	return this.name + "," + this.sex + "," + this.birthday;
};

var stu1 = Object.create(People);
stu1.grade = 'Senior';
//TODO toString()

