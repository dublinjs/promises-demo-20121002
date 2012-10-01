if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(["./02-promiseAndCallback"], function(htmlLib){


	return {
		withPromise: function(callback)
		{
			htmlLib
				.getHtml("en", "one")
				.then(function(html) {
					callback(html.replace("a", "b"));
				}).end();
		},

		withPromisePromise: function()
		{
			return htmlLib
				.getHtml("en", "one")
				.then(function(html){
					return html.replace("a", "b");
				});
		},

		withCallback: function(callback)
		{
			htmlLib.getHtml("en", "one", function(e, html){
				callback(html.replace("a", "b"));
			});
		}
	}

});
