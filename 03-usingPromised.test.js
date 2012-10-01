if (typeof define !== 'function') { var define = require('amdefine')(module); }

define("03-usingPromised.test", ["buster", "q", "./02-promiseAndCallback", "./03-usingPromised"], function(buster, Q, htmlLib, libClient) {

	buster.testCase("03", {

		"should replace a with b in text (callback)": function(done)
		{
			var stub = this.stub(htmlLib, "getHtml")
				.withArgs("en", "one")
				.yields(null, "a");

			libClient.withCallback(function(html){
				expect(stub).toHaveBeenCalledOnce();
				expect(html).toEqual("b");
				done();
			});
		},

		"should replace a with b in text (promise)": function(done)
		{
			var deferred = Q.defer();
			setTimeout(function(){
				deferred.resolve("a");
			}, 50);

			var stub = this.stub(htmlLib, "getHtml")
				.withArgs("en", "one")
				.returns(deferred.promise);

			libClient.withPromise(function(html){
				expect(stub).toHaveBeenCalledOnce();
				expect(html).toEqual("b");
				done();
			});
		}

	});

});