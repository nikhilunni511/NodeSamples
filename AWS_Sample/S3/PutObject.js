/**
 * Sample2 : PutObject.js
 * 
 * @AUTHOR TonyGuu
 * 
 * @TIME 
 * 
 * @DESC
 * 1.
 * 
 */
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

//var s3 = new AWS.S3({params: {Bucket: 'myBucket', Key: 'myKey'}});
//s3.createBucket(function() {
//  s3.putObject({Body: 'Hello!'}, function() {
//    console.log("Successfully uploaded data to myBucket/myKey");
//  });
//});

var s3 = new AWS.S3();
var params = {
		Bucket : 'test-openteam-bucket', //required,bucket name
		Key : 'testkey',	  //required,object name
		Body : 'Hello World', //optional,contents of the object
		ACL : 'public-read'   //optional,permissions
};

/**
 * (AWS.Request) putObject(params = {}, callback) 
 * 			Adds an object to a bucket
 * (AWS.Request) putObjectAcl(params = {}, callback)
 * 			Uses the acl subresource to set the access control list (ACL) permissions for an object that already exists in a bucket.
 *
 */
s3.putObject(params, function(){
	console.log("Successfully uploaded data to openteam-test/testkey");
});





