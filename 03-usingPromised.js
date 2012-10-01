if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(["./02-promiseAndCallback"], function(htmlLib){


	return {
		withPromise: function(callback)
		{

		},

		withCallback: function(callback)
		{
			htmlLib.getHtml("en", "one", function(e, html){
				callback(html.replace("a", "b"));
			});
		}
	}

});
