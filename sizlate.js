var fs = require('fs');
exports.version = '0.6.0';

var updateNode = function(node, data, selector) {
	switch(typeof data) {
		case "string":
			if(data !== ""){
				node.innerHTML = data;
			}
		break;
		case "number": // TODO - confirm - this seems wrong - why only numbers to ids?
			if(selector == ".id"){
				node.id = data;
			}else {
				node.innerHTML = data;
			}
		break;
		case "object":
			for(var key in data){
				if(key === 'selectors') { // allow nested selectors
					node.innerHTML = exports.doRender(node.innerHTML, data[key]);
				}
				node[key] = (key == 'className') ? node[key] = node[key] + " " + data[key] : node[key] = data[key]; //if its a classname add its to what is already there instead of overriding.
			}
		break;
	}
	return node;
};


var selectorIterator = function(selectors, sizzle) {
	for(var key in selectors) {
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

exports.classifyKeys = function(data, options) {
	if(!options.classifyKeys || typeof data == "undefined"){
		return data;
	}
	var c = data.length;
	var retArray = [];
	while(c--) {
		var newObj = {};
		for(var key in data[c]){
			newObj['.'+key] = data[c][key];
		}
		retArray.push(newObj);
	}
	return retArray;
};

exports.__express = function(filename, options, callback) {
	var fs = require('fs');
	var selectors = options.selectors;
	for(var key in selectors) {
		if(selectors[key].partial){// this is a partial.
			if(selectors[key].data && selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.
				fs.readFile(options.settings.views + '/partials/' + selectors[key].partial + '.' + options.settings['view engine'], 'utf8', function (err, data) {
					selectors[key] = exports.doRender('<body>' + data + '</body>', exports.classifyKeys(selectors[key].data, selectors[key])).slice(6, -7);	// adding and then stripping body tag for jsdom.
				});
			}
		}
	}
	if(options.layout) {
		fs.readFile(options.settings.views + '/' + options.layout + '.'+ options.settings['view engine'], 'utf8', function(error, template) {
			fs.readFile(filename, 'utf8', function(err,data){
			  if(err) {
			    console.error("Could not open file: %s", err);
			    process.exit(1);
			  }
			  var selectors = {};
			  selectors[options.container || '#container'] = data;
			  var markup = exports.doRender(template,   selectors) ;
			  callback(null, '<!DOCTYPE html>'+exports.doRender(markup, options.selectors));
			});
		});
	} else { // no layouts specified, just do the render.
		fs.readFile(filename, 'utf8', function(err,data){
		  if(err) {
		    console.error("Could not open file: %s", err);
		    process.exit(1);
		  }
		  callback(null, '<!DOCTYPE html>'+exports.doRender(template, { '#content': exports.doRender(data, options) } ) );
		});
	}
};

exports.doRender = function(str, selectors) {
	var browser = require("jsdom/lib/jsdom/browser");
	var dom = browser.browserAugmentation(require("jsdom/lib/jsdom/level2/core").dom.level2.core);
	var doc = new dom.Document("html");
	doc.innerHTML = '<html><body>' + str + '</html></body>';
	var sizzle = require("./lib/sizzle.js").sizzleInit({}, doc);
	if(typeof selectors === "undefined"){
		return "";
	}
	var selectors = (typeof selectors[0] == 'undefined') ? [selectors] : selectors; // make sure we have an array.
	var selectorCount = selectors.length;
	var outString = "";
	while(selectorCount--){
		selectorIterator(selectors[selectorCount], sizzle);
		outString = outString + doc.innerHTML.slice(12, -14); // slice strips html/body tags added above.
	}
	return outString;
};