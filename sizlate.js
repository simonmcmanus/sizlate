


exports.render = function(str, options) {
	if(typeof options.locals.parentView != "undefined"){ // its the last call
		var browser = require("./lib/jsdom/lib/jsdom/browser");
		var dom = browser.browserAugmentation(require("./lib/jsdom/lib/jsdom/level2/core").dom.level2.core);
		var doc = new dom.Document("html");
		doc.innerHTML = str;
		var sizzle = require("./lib/sizzle.js").sizzleInit({}, doc);
		sizzle('#container')[0].innerHTML=options.locals.body;
			var selectors = options.locals.selectors;
			for(key in selectors) {
				var array = (selectors[key].constructor == Array) ? selectors[key] : [selectors[key]]; // make sure we have an array.

		//		console.log('array is: ', array);
				var c = array.length;
				while(c--){
		//			console.log('split: ', array[c]);
					var domNode = sizzle(key)[c];
					if(domNode){
			//			console.log('G>>', typeof domNode, array[c]);
		//	
					console.log('G>>', typeof domNode, array[c]);
						domNode.innerHTML = array[c];	
						var	lastDomNode = domNode;				
					} else {
						var newDomNode = lastDomNode;
						
						console.log('ldb', domNode, lastDomNode.parentNode.id);
//						newDomNode.innerHTML=array[c];
//						lastDomNode.parentNode.appendChild(newDomNode);
							console.log('B>>', lastDomNode.id, array[c]);
					}
				}
			}
		
		return doc.innerHTML;
	}
	
	
	
	return str;
};

