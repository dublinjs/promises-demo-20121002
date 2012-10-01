if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(["express", "q"], function(express, Q) {

	var app = express();
	app.use(express.static("./testdata"));
	app.use(express.logger());

	var makeMiddleware = function(msg, timeout)
	{
		return function(req, res, next){

			console.log("Creating", msg);

			res.promises = res.promises || [];

			var deferred = Q.defer();

			res.promises.push(deferred.promise);

			setTimeout(function(){

				console.log("Resolving", msg);
				deferred.resolve();

			}, timeout);

			next();

		}
	};

	app.use("/", makeMiddleware("load users", 100));
	app.use("/", makeMiddleware("load products", 200));

	app.get("/", function(req, res){

		console.log("Waiting for promises");
		Q.all(res.promises).then(function(){
			console.log("Done!");
			res.send("OK");
		}).end();

	});


	app.listen(1337);

});