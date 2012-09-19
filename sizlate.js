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


exports.__express = function(filename, options, callback) {
	var fs = require('fs');
	console.log(options);

	if(options.layout) {
		fs.readFile(options.settings.views + '/' + options.layout + '.'+ options.settings['view engine'], function(error, template) {
			var selectors = {
				'#content': template
			}
			fs.readFile(filename, function(err,data){
			  if(err) {
			    console.error("Could not open file: %s", err);
			    process.exit(1);
			  }
			  callback(null, exports.doRender(template,  { '#content': exports.doRender(data, options) } ) );
			});


			exports.doRender();
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


exports.render = function(str, options) {
	return exports.doRender(str, options);
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

exports.compile = function(str, options) {
	var selectors = options.selectors;
	for(var key in selectors) {
		if(typeof selectors[key].partial !== "undefined" ){// this is a partial.
			if(typeof selectors[key].data === "undefined" || selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.
				// TODO _ we should confirm if classify keys is not disabled.
				selectors[key] = exports.doRender('<body>' + exports.partials[selectors[key].partial] + '</body>', exports.classifyKeys(selectors[key].data, selectors[key])).slice(6, -7);	// adding and then stripping body tag for jsdom.
			}
		}
	}
	return function(locals) {
		/*
			todo - Forcing html5 doctype. - needs to be fixed. its available in the str param passed into compile.
					There should be some checking if the string is a doctype, it should then be used to set JSDOM mode.
		*/
		return '<!DOCTYPE html>'+exports.render(str, {locals: options});
	};
};



exports.startup = function(app, callback) {
	var count = 0;
	var dir = app.settings.dirname;
	fs.readdir(dir+'/views/partials/', function (err, files) {
		if (err) {
			if(!dir){
				console.log('Error loading partial from dir: ' + dir + '/views/partials/' );
				console.log('YOU NEED TO SET THE EXPRESS __dirname PARAMETER ');
				console.log('TRY THIS: ', "app.configure( function () {  app.set('dirname', __dirname) });");
			}
			throw err;
		}
		exports.partials = {};
		files.forEach( function (file) {
			count = count + 1;
			fs.readFile(dir+'/views/partials/' + file, function (err, data) {
				count = count -1;
				if (err) throw err;
				exports.partials[file] = '' + data;
				if(count===0) {
					callback(app);
				}
			});
		});
	});
};