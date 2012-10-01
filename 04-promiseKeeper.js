var noop = function(){};
// remove existing Q (hopefully it has no state...)
delete require.cache[require.resolve('q')];

// remove freezing so we can modify Q
var origFreeze = Object.freeze;
Object.freeze = noop;

// require Q and restore freezing
var Q = require('q');
Object.freeze = origFreeze;

// copy/pasted from Q - we'll defend it after we modify it
var defend = Object.freeze || noop;
if (typeof cajaVM !== "undefined") {
	defend = cajaVM.def;
};

var current = [], prev = [], total=0;

// add the promise to an array
// make sure to remove it when it is done
// oh, and "defend" it...
var recordPromise = function(promise)
{
	current.push(promise);
	total++;

	var rm = function()
	{
		// not the most efficient way... but who cares
		current = current.filter(function(i){ return i!=promise; });
	};

	var nextPromise = promise.then(rm, rm);
	defend(nextPromise);
	return nextPromise;
}


// modify makePromise and defer - I think these are the only places
// that create promises
var origMake = Q.makePromise;
Q.makePromise = function()
{
	return recordPromise(origMake.apply(this, arguments));
};

var origDefer = Q.defer;
Q.defer = function()
{
	var deferred = origDefer.apply(this, arguments);
	deferred.promise = recordPromise(deferred.promise);
	return deferred;
};

// defend things that should've been defended...
defend(Q.makePromise.prototype);
defend(Q);

// logs:
// * how many are still unresolved
// * how many of those were in the previous snapshot and are still unresolved
// * how many new promises were created since last snapshot
exports.snapshot = function() {
	var now = new Date().getTime();
	var stillCount = current.filter(function(p){ return prev.indexOf(p)>=0; }).length;
	console.log("Not kept:",current.length,"From before:",stillCount,"Generated:",total);
	prev = current.slice();
	total = 0;
};