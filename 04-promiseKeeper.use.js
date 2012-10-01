var keeper = require('./04-promiseKeeper');
var Q = require('q');

var PROBABILITY_OF_RESOLVE = 0.1;
var N_PUSHER = 100;
var N_RESOLVER = 200;
var N_LOG = 500;


var deferreds = [];

var resolver = function() {
	console.log("Resolving");
	deferreds = deferreds.filter(function(p){
		var shouldResolve = Math.random() <= PROBABILITY_OF_RESOLVE;
		if (shouldResolve)
		{
			p.resolve();
		}
		return !shouldResolve;
	});
	setTimeout(resolver, Math.random()*N_RESOLVER);
};
var pusher = function() {
	console.log("Pushing");
	var deferred = Q.defer();
	deferreds.push(deferred);
	setTimeout(pusher, Math.random()*N_PUSHER);
};
resolver();
pusher();
setInterval(keeper.snapshot, N_LOG);
