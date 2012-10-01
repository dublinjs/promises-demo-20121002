if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(["fs", "path", "q"], function(fs, path, Q){

	var defaultLang = "en", UTF = 'utf-8';

	var getFn = function(lang, pageId)
	{
		return path.join("testdata", pageId+"."+lang+".html");
	};

	var getHtml = function (lang, pageId)
	{
		return Q.ninvoke(fs, "readFile", getFn(lang, pageId), UTF);
	};

	return {
		getHtml: getHtml
	};

});
