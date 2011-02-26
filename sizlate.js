


exports.render = function(str, options) {
	var browser = require("../lib/jsdom/lib/jsdom/browser");
	var dom = browser.browserAugmentation(require("../lib/jsdom/lib/jsdom/level2/core").dom.level2.core);
	var doc = new dom.Document("html");
	doc.innerHTML = str;
	var sizzle = require("../lib/jsdom/example/sizzle/sizzle.js").sizzleInit({}, doc);
	var selectors = options.locals.selectors;
	for(key in selectors) {
		var array = (selectors[key].constructor == Array) ? selectors[key] : [selectors[key]]; // make sure we have an array.
		var c = array.length;
		while(c--){
			var domNode = sizzle(key)[c];
			if(domNode){
				domNode.innerHTML = array[c];							
			}
		}
	}
	return doc.innerHTML;
};