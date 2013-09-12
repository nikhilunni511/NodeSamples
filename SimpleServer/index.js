/**
 * @author TonyGuu
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

/*
using a array object to 
store the mapping of pathname and corresponding handle method;
we may call the array object as route table
*/
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/expensiveOper"] = requestHandlers.expensiveOper;
handle["/show"] = requestHandlers.show;

console.log("Begin to start server in localhost");

server.start(router.route, handle);
