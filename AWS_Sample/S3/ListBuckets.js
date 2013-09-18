/**
 * Sample1 : ListBuckets.js
 * 
 * @AUTHOR TonyGuu
 * 
 * @TIME 
 * 
 * @DESC
 * 1.
 * 2.S3 API refer : http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html
 * 
 */

var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  for (var index in data.Buckets) {
    var bucket = data.Buckets[index];
    console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
  }
});
