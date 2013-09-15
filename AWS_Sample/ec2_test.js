/**
 * @author TonyGuu
 * 
 * DESC:
 * 1.the code is copied from http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/examples.html
 * 2.
 * 
 */
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

var ec2 = new AWS.EC2();

var params = {
  ImageId: 'ami-0358ce33', // Amazon Linux AMI x86_64 EBS
  InstanceType: 't1.micro',
  MinCount: 1, MaxCount: 1
};

// Create the instance
ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

  var instanceId = data.Instances[0].InstanceId;
  console.log("Created instance", instanceId);

  // Add tags to the instance
  params = {Resources: [instanceId], Tags: [
    {Key: 'Name', Value: "OpenTeamTestWebServer"}
  ]};
  ec2.createTags(params, function(err) {
    console.log("Tagging instance", err ? "failure" : "success");
  });
});