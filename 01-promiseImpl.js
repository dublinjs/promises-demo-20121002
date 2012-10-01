if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(["fs", "path"], function(fs, path){

	var defaultLang = "en", UTF = 'utf-8';

	var getFn = function(lang, pageId)
	{
		return path.join("testdata", pageId+"."+lang+".html");
	};

	var getHtml = function (lang, pageId)
	{
		throw new Error("Not implemented");
	};

	return {
		getHtml: getHtml
	};

});
