/**
 * @author TonyGuu
 */
var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

/*
function expensiveOper(response){
	console.log("Request handler 'expensiveOper' was called.");

	// find /
	exec("ls -lah", function(error, stdout, stderr) {
		response.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		response.write(stdout);
		response.end();
	});
}

function start(response, postData){
	console.log("Request handler 'start' was called.");
	

		var body = '<html>' + '<head>' + '<meta http-equiv="Content-Type" '
			+ 'content="text/html; charset=UTF-8" />' + '</head>' + '<body>'
			+ '<form action="/upload" enctype="multipart/form-data" '
			+ 'method="post">' + '<input type="file" name="upload">'
			+ '<input type="submit" value="Upload file" />' + '</form>'
			+ '</body>' + '</html>';
		response.writeHead(200, {
			"Content-Type" : "text/html"
		});
		response.write(body);
		response.end();
}

function upload(response, postData){
	console.log("Request handler 'upload' was called.");
	var postText = querystring.parse(postData).text;//the text part in the post data
	
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write("You have sent: " + postText);
	response.end();
}
*/

function expensiveOper(response, request){
	console.log("Request handler 'expensiveOper' was called.");

	// find /
	exec("ls -lah", function(error, stdout, stderr) {
		response.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		response.write(stdout);
		response.end();
	});
}

function show(response, postData){
	console.log("Request handler 'show' was called.");
	
	fs.readFile("./tmp/test.jpg", "binary", function(error, file){
		if(error){
			response.writeHead(500, {
				"Content-Type" : "text/plain"
			});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200, {
				"Content-Type" : "image/png"
			});
			response.write(file, "binary");
			response.end();
		}
	});
}


//Requirement change(V2)
function start(response, request){
	console.log("Request handler 'start' was called.");
	

		var body = '<html>' + '<head>' + '<meta http-equiv="Content-Type" '
			+ 'content="text/html; charset=UTF-8" />' + '</head>' + '<body>'
			+ '<form action="/upload" enctype="multipart/form-data" '
			+ 'method="post">' + '<input type="file" name="upload">'
			+ '<input type="submit" value="Upload file" />' + '</form>'
			+ '</body>' + '</html>';
		response.writeHead(200, {
			"Content-Type" : "text/html"
		});
		response.write(body);
		response.end();
}
function upload(response, request){
	console.log("Request handler 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
	    console.log("parsing done");
	    fs.renameSync(files.upload.path, "./tmp/test.jpg");
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("received image:<br/>");
	    response.write("<img src='/show' />");
	    response.end();
	  });
}


exports.start = start;
exports.upload = upload;
exports.expensiveOper = expensiveOper;
exports.show = show;