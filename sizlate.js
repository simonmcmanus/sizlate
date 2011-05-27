


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
				console.log(key);
				var array = (selectors[key].constructor == Array) ? selectors[key] : [selectors[key]]; // make sure we have an array.
				var c = array.length;
				var pendingItems  = [];
				
				while(c--){
					var d = c;
					var domNode = sizzle(key)[d];
					if(domNode){
						
						
						
						var pendingItemsCount = pendingItems.length;
						while(pendingItemsCount--){
							var newNode = domNode.cloneNode();
							newNode.innerHTML = pendingItems[pendingItemsCount];
							domNode.parentNode.appendChild(newNode);
							pendingItems.pop();
						}
						domNode.innerHTML = array[c];	
						console.log('pending items', pendingItems);
					//	console.log('ldb1', lastDomNode, ">>>", array[c]);
								
					} else {
						pendingItems.push(array[c]);
						//lastDomNode.innerHTML=array[c];
						//lastDomNode.parentNode.appendChild(newDomNode);
					}
				}
			}	
		return doc.innerHTML;
	}
	return str;
};

/*
function clone(o) {
        var c = {};
        for(var i in o) {
            if(typeof(o[i])=="object")
                c[i] = clone(o[i]);
            else
                c[i] = o[i];
        }
        return c;
    }

*/
