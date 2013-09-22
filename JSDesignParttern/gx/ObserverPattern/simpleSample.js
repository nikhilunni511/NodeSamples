/**
 * @Author TonyGuu
 * 
 * @Time ${time}
 * 
 * @Desc
 * 1.subscriber ------subscribe/listen----> publisher
 */
var pubsub = {};
(function(q) {
	var topics = {};
	var subUid = -1;
	// Publish or broadcast events of interest
	// with a specific topic name and arguments
	// such as the data to pass along
	q.publish = function(topic, args) {
//		console.log(topics[topic]);
		if (!topics[topic]) {
			return false;
		}
		var subscribers = topics[topic];
		var len = subscribers ? subscribers.length : 0;
		while (len--) {
			subscribers[len].func(topic, args);//invoke the callback
		}
		return this;
	};
	// Subscribe to events of interest
	// with a specific topic name and a
	// callback function, to be executed
	// when the topic/event is observed
	q.subscribe = function(topic, func) {
		if (!topics[topic]) {
			topics[topic] = [];
		}
		var token = (++subUid).toString();
		topics[topic].push({
			token : token,
			func : func
		});
		return token;
	};
	// Unsubscribe from a specific
	// topic, based on a tokenized reference
	// to the subscription
	q.unsubscribe = function(token) {
		for ( var m in topics) {
			if (topics[m]) {
				for ( var i = 0, j = topics[m].length; i < j; i++) {
					if (topics[m][i].token === token) {
						topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	};
}(pubsub));


var callbackHandler = function(topic, args) {
	console.log(topic + ": " + args);
};
// Subscribers basically "subscribe" (or listen)
// Subscriber -----subscribe/listen-----> Publisher
// And once they've been "notified" their callback functions are invoked
var subToken = pubsub.subscribe('topic1', callbackHandler);
// Publishers are in charge of "publishing" notifications about events
pubsub.publish('topic1', 'hello world!');
pubsub.publish('topic1', [ 'test', 'a', 'b', 'c' ]);
pubsub.publish('topic1', [ {'color' : 'blue'}, {'text' : 'hello'} ]);
// Unsubscribe if you no longer wish to be notified
pubsub.unsubscribe(subToken);
// This will fail
pubsub.publish('topic1', 'hello again! (this will fail)');