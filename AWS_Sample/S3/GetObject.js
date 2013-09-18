/**
 * Sample3 : GetObject.js
 * 
 * @AUTHOR TonyGuu
 * 
 * @TIME 
 * 
 * @DESC
 * 1.Purpose : get data(file,photo..) from the AWS Platform
 * 2.STATUS : FAILE
 * 3.S3 API refer http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html
 * getObject refer http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectGET.html
 * 
 */
var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.update({region: 'ap-southeast-1'});
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var s3 = new AWS.S3();
var params = {
	Bucket : 'testopenteambucket',
	Key : 'test.jpg'
};

var file = fs.createWriteStream('C:/WorkSpace4Node/aws_outbound/test.jpg');
s3.getObject(params, function(err, data){
	if(err){
		console.log(err);
	}else{
		
	}
}).createReadStream().pipe(file);

/*
 * Error: Hostname/IP doesn't match certificate's altnames
    at SecurePair.<anonymous> (tls.js:1366:23)
    at SecurePair.EventEmitter.emit (events.js:92:17)
    at SecurePair.maybeInitFinished (tls.js:970:10)
    at CleartextStream.read [as _read] (tls.js:463:15)
    at CleartextStream.Readable.read (_stream_readable.js:320:10)
    at EncryptedStream.write [as _write] (tls.js:366:25)
    at doWrite (_stream_writable.js:221:10)
    at writeOrBuffer (_stream_writable.js:211:5)
    at EncryptedStream.Writable.write (_stream_writable.js:180:11)
    at write (_stream_readable.js:583:24)

 * 
 * 
 * */

