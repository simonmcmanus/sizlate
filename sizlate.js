var updateNode = function(node, data) {
	if(typeof data == "string") {
		node.innerHTML = data;
	}else if (typeof data == "object") {
		for(key in data) {
			if(key=='className'){
				node[key] = node[key] +" "+ data[key];
			}else{
				node[key] = data[key];				
			}
		}
	}
	return node;	
};


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
				var c = array.length;
				var pendingItems  = [];
				while(c--){
					var d = c;
					var domNode = sizzle(key)[d];
					if(domNode){
						var pendingItemsCount = pendingItems.length;
						while(pendingItemsCount--){
							var newNode = domNode.cloneNode(true);
							newNode = updateNode(newNode, pendingItems[pendingItemsCount]);
							domNode.parentNode.appendChild(newNode);
							pendingItems.pop();
						}
						domNode = updateNode(domNode, array[c]);								
					} else {
						pendingItems.push(array[c]);
					}
				}
			}	
		return doc.innerHTML;
	}
	return str;
};


exports.compile = function(str, options) {
    return function(locals) {
        return exports.render(str, {locals: locals});
    }
};