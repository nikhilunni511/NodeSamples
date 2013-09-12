/**
 * @author TonyGuu
 * 
 * The details may refer to the link : 
 * http://www.nodebeginner.org/index-zh-cn.html
 */
var http = require("http");
var url = require("url");

//Refer the "Parse the url.txt" for how to parse url
/*
function start(route, handle){
	function onRequest(request, response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		//[Thinking]consider the role of each component in the system,
		// the http server is responsible for receiving data in the request,
		// and route the data to corresponding functional method.
		request.setEncoding("utf8");
		
		//collect all the data chunk from the request
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
					postDataChunk + "'.");
		});
		
		request.addListener("end", function(){
			route(handle, pathname, response, postData);//invoke the route() function
		});
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
*/

//Requirement change(V2):
//Upload the photo file from the start page to the server and return it to show on the page
function start(route, handle){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);//invoke the route() function
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
exports.start = start;