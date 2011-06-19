var fs = require('fs');
exports.version = '0.2';

var updateNode = function(node, data) {
	console.log(data);
	if(typeof data == "string") {
		node.innerHTML = data;
	}else if (typeof data == "object") {
		for(key in data) {
			if(key == 'className') {
				node[key] = node[key] +" "+ data[key];
			}else if (key == '.id') {
				node['id'] = data[key];
			}else {
				node[key] = data[key];
			}
		}
	}
	return node;	
};

exports.doRender = function(str, options) {
	var browser = require("jsdom/lib/jsdom/browser");
	var dom = browser.browserAugmentation(require("jsdom/lib/jsdom/level2/core").dom.level2.core);
	var doc = new dom.Document("html");
	doc.innerHTML = str;
	var sizzle = require("./lib/sizzle.js").sizzleInit({}, doc);
	if(typeof options.locals != "undefined" && sizzle('#container')[0]){ // called via render - should be the last call.
		sizzle('#container')[0].innerHTML = options.locals.body;		
		var selectors = options.locals.selectors;
	} else { // called directly
		var selectors = options;
	}
	
	var selectors = (typeof selectors[0] == 'undefined') ? [selectors] : selectors; // make sure we have an array. 
	var selectorCount = selectors.length;
	var outString = "";
	while(selectorCount--){
		selectorIterator(selectors[selectorCount], sizzle);
		outString = outString + doc.innerHTML;
	}
	return outString;	
};


var selectorIterator = function(selectors, sizzle) {
	for(key in selectors) {
		var a = (selectors[key].constructor == Array) ? selectors[key] : [selectors[key]]; // make sure we have an array.
		var c = a.length;
		var pendingItems = [];
		while(c--) {
			var domNode = sizzle(key)[c];
			if(domNode) {
				var pendingItemsCount = pendingItems.length;
				while(pendingItemsCount--) {
					var newNode = domNode.cloneNode(true);
					newNode = updateNode(newNode, pendingItems[pendingItemsCount]);
					domNode.parentNode.appendChild(newNode);
					pendingItems.pop();
				}
				domNode = updateNode(domNode, a[c]);
			} else {
				pendingItems.push(a[c]); 
			}
		}		
	}
};


exports.render = function(str, options) {
	if(typeof options.locals.parentView != "undefined") { // its the last call
		str = exports.doRender(str, options);
	}
	return str;
};

var classifyKeys = function(ar) {
	var c = ar.length;
	var retArray = [];
	while(c--) {
		var newObj = {};
		for(key in ar[c]){
			newObj['.'+key] = ar[c][key];
		}
		retArray.push(newObj);
	}
	return retArray;
};

exports.compile = function(str, options) {
	var selectors = options.selectors;
	for(key in selectors) {
		if(typeof selectors[key].partial !=="undefined"){// this is a partial.			
			selectors[key] = exports.doRender('<body>'+exports.partials[selectors[key].partial]+'</body>', classifyKeys(selectors[key].data)).slice(6, -7);	// adding and then stripping body tag for jsdom. 
		}
	}
	return function(locals) {
		return exports.render(str, {locals: options});	
	}
};

exports.startup = function(app, callback) { 
	var count = 0;
	fs.readdir('./views/partials/', function (err, files) { 
		if (err) throw err;
		exports.partials = {};
		files.forEach( function (file) {
			count = count + 1;
			fs.readFile('./views/partials/'+file, function (err, data) {
				count = count -1;
				if (err) throw err;
				exports.partials[file] = ''+data;
				if(count===0) {
					callback(app);
				}
			});	
		});
	});
};
