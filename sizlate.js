var fs = require('fs');

exports.version = '0.2';

var updateNode = function(node, data, selector) {
	switch(typeof data)
	{
		case "string":
			node.innerHTML = data;
	  	break;
		case "number":
			if(selector == ".id"){
		  		node.id = data;				
			}else {
				node.innerHTML = data;				
			}
	  	break;
		case "object":
			for(key in data) {
				if(key == 'className') {
					node[key] = node[key] +" "+ data[key];
				}else {
					node[key] = data[key];
				}
			}
	  	break;
	
	}
	return node;	
};

exports.doRender = function(str, options) {
	console.log('debug: called - doRender ');
	// this is not being called the last time round.
	var browser = require("jsdom/lib/jsdom/browser");
	var dom = browser.browserAugmentation(require("jsdom/lib/jsdom/level2/core").dom.level2.core);
	var doc = new dom.Document("html");
	doc.innerHTML = str;
	var sizzle = require("./lib/sizzle.js").sizzleInit({}, doc);
	
	console.log(typeof options.locals, typeof sizzle('#container')[0]);
	// as layout is turned off the container does not exist so we are never in this loop.
	if(typeof options.locals != "undefined"){ // called via render - should be the last call.
		console.log('debug: called via render');
		var selectors = options.locals.selectors;
		if(sizzle('#container')[0]){
			sizzle('#container')[0].innerHTML = options.locals.body;					
		}
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
	//console.log('sending: ', outString);
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
					newNode = updateNode(newNode, pendingItems[pendingItemsCount], key);
					domNode.parentNode.appendChild(newNode);
					pendingItems.pop();
				}
				domNode = updateNode(domNode, a[c], key);
			} else {
				pendingItems.push(a[c]); 
			}
		}		
	}
};


exports.render = function(str, options) {
	
//	if(typeof options.locals.parentView != "undefined") { // its the last call
		str = exports.doRender(str, options);
//	}
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
