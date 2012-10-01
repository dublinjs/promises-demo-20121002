if (typeof define !== 'function') { var define = require('amdefine')(module); }

define("00-withoutPromises.test", ["buster", "fs", "./00-withoutPromises"], function(buster, fs, html) {

	buster.testCase("00", {


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
			html.getHtml("de", "one", function(e, data){

				expect(this.fsStub).toHaveBeenCalledOnce();
				expect(e).toBeNull();
				expect(data).toEqual("one german");
				done();

			}.bind(this));
		},

		"should read file (de, fallback)": function(done)
		{
			html.getHtml("de", "two", function(e, data){

				expect(this.fsStub).toHaveBeenCalledTwice();
				expect(e).toBeNull();
				expect(data).toEqual("two english");
				done();

			}.bind(this));
		},

		"should return error (en, na)": function(done)
		{
			html.getHtml("en", "na", function(e, data){

				expect(this.fsStub).toHaveBeenCalledOnce();
				expect(e).not.toBeNull();
				expect(data).toBeNull();
				done();

			}.bind(this));
		},

		"should return error (de, na)": function(done)
		{
			html.getHtml("de", "na", function(e, data){

				expect(this.fsStub).toHaveBeenCalledTwice();
				expect(e).not.toBeNull();
				expect(data).toBeNull();
				done();

			}.bind(this));
		}

	});

});