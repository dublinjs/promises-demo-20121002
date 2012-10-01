if (typeof define !== 'function') { var define = require('amdefine')(module); }

define("01-promiseImpl.test", ["buster", "fs", "./01-promiseImpl"], function(buster, fs, html) {

	buster.testCase("01", {


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
				})
				.fin(done).end();
//		},
//
//		"should return error (de, na)": function(done)
//		{
//			throw new Error("Not implemented");
		}

	});

});