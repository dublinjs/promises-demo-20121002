if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(["fs", "path", "q"], function(fs, path, Q){

	var defaultLang = "en", UTF = 'utf-8';

	var getFn = function(lang, pageId)
	{
		return path.join("testdata", pageId+"."+lang+".html");
	};

	var getHtml = function (lang, pageId, callback)
	{
		var promise = Q.ninvoke(fs, "readFile", getFn(lang, pageId), UTF);

		var onError = (lang == defaultLang
			? Q.reject
			: function() { return getHtml(defaultLang, pageId); });

		promise = promise.then(Q.resolve, onError);

		if (callback) {
			promise.then(function(data){
				callback(null, data);
			}).fail(function(error){
				callback(error, null);
			}).end();
		} else {
			return promise;
		}
	};

	return {
		getHtml: getHtml
	};

});
