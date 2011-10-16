var fs = require('fs');

exports.version = '0.2';

var updateNode = function(node, data, selector) {
	switch(typeof data)
	{
		case "string":
			if(data !=""){
				node.innerHTML = data;				
			}
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
	console.log(options);
	var jsdom = require('./lib/jsdom/lib/jsdom.js').jsdom;
console.log(str);
	var doc   = jsdom("<html><body>"+str+"</body></html>", null, {});
    var sizzle = require("./lib/sizzle.js").sizzleInit({}, doc);

	//console.log(typeof options.locals, typeof sizzle('#container')[0]);
	// as layout is turned off the container does not exist so we are never in this loop.
	if(typeof options.locals != "undefined"){ // called via render - should be the last call.
		//console.log('debug: called via render');
		var selectors = options.locals.selectors;
		if(sizzle('#container')[0]){
			sizzle('#container')[0].innerHTML = options.locals.body;					
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
		outString = outString + doc.innerHTML;
	}
	//console.log('sending: ', outString);
	return outString.slice(12, -14);	
};


var selectorIterator = function(selectors, sizzle) {
	
	for(key in selectors) {
//		if(!selectors[key]){ // break on nulls.
//			break;
//		}
		var a = (selectors[key] && selectors[key].constructor == Array) ? selectors[key] : [selectors[key]]; // make sure we have an array.
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

var classifyKeys = function(ar, classify) {
	if(typeof ar == "undefined"){
		return false;
	}
	
	if(classify === false){
		return ar;
	}

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
//	console.log('selectors: ', selectors);
	for(key in selectors) {
		if(typeof selectors[key].partial !=="undefined" ){// this is a partial.	
			if(typeof selectors[key].data === "undefined" || selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.
				
				selectors[key] = exports.doRender('<body>'+exports.partials[selectors[key].partial]+'</body>', classifyKeys(selectors[key].data, selectors[key].classifyKeys)).slice(6, -7);	// adding and then stripping body tag for jsdom. 				
			}
			//console.log('data', typeof selectors[key].data);
			//	console.log('in here');
		}
	}
	return function(locals) {
		return exports.render(str, {locals: options});	
	}
};

exports.startup = function(app, callback) { 
	var count = 0;
	console.log(app.set('dirname')+'/views/partials/');
	fs.readdir(app.set('dirname')+'/views/partials/', function (err, files) { 
		if (err) throw err;
		exports.partials = {};
		files.forEach( function (file) {
			count = count + 1;
			fs.readFile(app.set('dirname')+'/views/partials/'+file, function (err, data) {
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
