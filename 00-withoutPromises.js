if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(["fs", "path"], function(fs, path){

	var defaultLang = "en", UTF = 'utf-8';

	var getFn = function(lang, pageId)
	{
		return path.join("testdata", pageId+"."+lang+".html");
	};

	var getHtml = function (lang, pageId, callback)
	{
		fs.readFile(getFn(lang, pageId), UTF, function(e, data){
			if (e != null) {
				if (lang == defaultLang) {
					callback(e, null);
				} else {
					getHtml(defaultLang, pageId, callback);
				}
				return;
			}
			callback(null, data);
		});
	};

	return {
		getHtml: getHtml
	};

});
