if (typeof define !== 'function') { var define = require('amdefine')(module); }

define("02-promiseAndCallback.test", ["buster", "fs", "./02-promiseAndCallback"], function(buster, fs, html) {

	buster.testCase("02", {


		"setUp": function()
		{
			this.fsStub = this.stub(fs, "readFile");
			this.fsStub.withArgs("testdata/one.en.html", "utf-8").yields(null, "one english");
			this.fsStub.withArgs("testdata/one.de.html", "utf-8").yields(null, "one german");
			this.fsStub.withArgs("testdata/two.en.html", "utf-8").yields(null, "two english");
			this.fsStub.withArgs("testdata/two.de.html", "utf-8").yields(new Error(), null);
			this.fsStub.withArgs("testdata/na.en.html", "utf-8").yields(new Error(), null);
			this.fsStub.withArgs("testdata/na.de.html", "utf-8").yields(new Error(), null);
		},

		"withPromise": {
			"should read file (de, exists)": function(done)
			{
				html.getHtml("de", "one")
					.then(function(contents){
						expect(contents).toEqual("one german");
					}.bind(this))
					.fail(this.mock().never())
					.fin(done).end();
			},

			"should read file (de, fallback)": function(done)
			{
				html.getHtml("de", "two")
					.then(function(contents){
						expect(contents).toEqual("two english");
						expect(this.fsStub).toHaveBeenCalledTwice();
					}.bind(this))
					.fail(this.mock().never())
					.fin(done).end();
			},

			"should return error (en, na)": function(done)
			{
				html.getHtml("en", "na")
					.then(this.mock().never())
					.fail(function(e){
						expect(e).not.toBeNull();
						expect(this.fsStub).toHaveBeenCalledOnce();
					}.bind(this))
					.fin(done).end();
			},

			"should return error (de, na)": function(done)
			{
				html.getHtml("de", "na")
					.then(this.mock().never())
					.fail(function(e){
						expect(e).not.toBeNull();
						expect(this.fsStub).toHaveBeenCalledTwice();
					}.bind(this))
					.fin(done).end();
			}
		},

		"withCallback": {
//			"should read file (de, exists)": function(done)
//			{
//				throw new Error("Not implemented");
//			},
//
//			"should read file (de, fallback)": function(done)
//			{
//				throw new Error("Not implemented");
//			},
//
//			"should return error (en, na)": function(done)
//			{
//				throw new Error("Not implemented");
//			},
//
//			"should return error (de, na)": function(done)
//			{
//				throw new Error("Not implemented");
//			}
		}

	});

});