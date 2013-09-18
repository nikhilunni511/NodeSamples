/**
 * Sample3 : FileDownload.js
 * 
 * @AUTHOR TonyGuu
 * 
 * @TIME
 * 
 * @DESC
 * 1.Purpose : download the specified photo from the AWS S3
 * 2.STATUS : OK
 * 3.S3 API refer http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html
 */
AWS = require('aws-sdk');
AWS.config.update({region : 'ap-southeast-1'});

var s3 = new AWS.S3();
var params = {
	Bucket : 'test-openteam-bucket',
	Key : 'test.jpg'
};
var httpsurl;

//Get a pre-signed URL for a given operation name.
//(String?) getSignedUrl(operation, params, callback)
s3.getSignedUrl('getObject', params, function(err, url) {
	if(err){
		console.log(err);
	}
	httpsurl = url;
	console.log("The URL is", url);
});

var https = require('https');// must be https
var fs = require('fs');

var download = function(url, dest, cb) {
	//(WriteStream)fs.createWriteStream(path, [options])
	//options may refer the API
	var file = fs.createWriteStream(dest);
	
	//https.get(options, callback),notice the callback is only one
	//argument response
	https.get(url, function(resp) {
		console.log("statusCode: ", resp.statusCode);
		console.log("headers: ", resp.headers);
		resp.pipe(file);
		file.on('finish', function() {
			file.close();
			cb('It\'s saved!');
		});
	}).on('error', function(e){
		console.log("Got error:" + e.message);
	});
};

download(httpsurl, './test.jpg', console.log);

//====ok====

//https.get(httpsurl, function(res) {
//	console.log("statusCode: ", res.statusCode);
//	console.log("headers: ", res.headers);
//
//	//event : data
//	res.once('finish', function(d) {
////		process.stdout.write(d);
//		fs.writeFile('./test.jpg', d, function(err) {
//			//if (err) throw err;
//			if(err) console.log(err);
//			console.log('It\'s saved!');
//		});
//	});
//
//}).on('error', function(e) {
//	console.error(e);
//});
