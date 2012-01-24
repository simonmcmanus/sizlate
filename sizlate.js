var fs = require('fs');

exports.version = '0.5.0';

var updateNode = function(node, data, selector) {
	switch(typeof data) {
		case "string":
			if(data !=""){
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
			for(key in data) {
				if(key === 'selectors') { // allow nested selectors
					node.innerHTML = exports.doRender(node.innerHTML, data[key]);
				}
				node[key] = (key == 'className') ? node[key] = node[key] + " " + data[key] : node[key] = data[key]; //if its a classname add its to what is already there instead of overriding.
			}
	  	break;
	}
	return node;	
};

exports.doRender = function(str, options) {


			
	var browser = require("jsdom/lib/jsdom/browser");
	var dom = browser.browserAugmentation(require("jsdom/lib/jsdom/level2/core").dom.level2.core);
	var doc = new dom.Document("html");
	doc.innerHTML = '<html><body>' + str + '</html></body>';
	var sizzle = require("./lib/sizzle.js").sizzleInit({}, doc);
	// as layout is turned off the container does not exist so we are never in this loop.
	if(typeof options.locals != "undefined"){ // called via render - should be the last call.
		var container = options.locals.container || '#container';
		var selectors = options.locals.selectors;
		if(sizzle(container)[0]){
			sizzle(container)[0].innerHTML = options.locals.body;
		}
	} else { // called directly
		var selectors = options;
	}
	if(typeof selectors == "undefined"){
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

var _doRender = function(str, options) {
	
}


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
	return exports.doRender(str, options);
};

var classifyKeys = function(data, options) {
	console.log(data, options);
	if(!options.classifyKeys || typeof data == "undefined"){
		return data;
	}
	var c = data.length;
	var retArray = [];
	while(c--) {
		var newObj = {};
		for(key in data[c]){
			newObj['.'+key] = data[c][key];
		}
		retArray.push(newObj);
	}
	return retArray;
};

exports.compile = function(str, options) {
	var selectors = options.selectors;
	for(key in selectors) {
		if(typeof selectors[key].partial !== "undefined" ){// this is a partial.	
			if(typeof selectors[key].data === "undefined" || selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.
					// TODO _ we should confirm if classify keys is not disabled.
					selectors[key] = exports.doRender('<body>' + exports.partials[selectors[key].partial] + '</body>', classifyKeys(selectors[key].data, selectors[key])).slice(6, -7);	// adding and then stripping body tag for jsdom. 					
			}
		}
	}
	return function(locals) {
		return exports.render(str, {locals: options});	
	}
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
//			console.log('Have you set: ');
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