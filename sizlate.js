var fs = require('fs');
var cheerio = require('cheerio');
exports.version = '0.8.3';

var checkForInputs = function($node, data) {
	$node.each(function(i, elem) {
		if(this[0].name === 'input') {
			$(this[0]).attr('value', data);
		}else {
			$(this[0]).html(data);
		}
	});
};

var updateNodeWithObject = function($node, obj) {
	for(var key in obj){
		switch(key) {
			case 'selectors':
				// we need to iterate over the selectors here. 
				var selectors = obj[key];
				for(var selector in selectors) {
					$node.find(selector).html(selectors[selector]);
				}
			break;
			case 'className':
				$node.addClass(obj[key]);
			break;
			case'innerHTML' :
				$node.html(obj[key]);
			break;
			case'innerText' :
				$node.text(obj[key]);
			break;
			default: 
				$node.attr(key, obj[key]);
		}
	}
	return $node;
};
var updateNode = function($node, selector, data) {
	switch(typeof data) {
		case "string":
			if(data !== ""){
				checkForInputs($node, data);
			}
		break;
		case "number": // TODO - confirm - this seems wrong - why only numbers to ids?
			if(selector == ".id"){
				$node.attr('id', data);
			}else if(selector == ".data-id") {
				$node.attr('data-id', data);
			}else {
				checkForInputs($node, data);
			}
		break;
		case "object":
			$node = updateNodeWithObject($node, data);
		break;
	}
	return $node;
};

var selectorIterator = function(selectors, $) {
	for(var selector in selectors) {
		if(typeof selectors[selector] === 'function') {
			break;
		}
		var $domNode = $(selector);
		if($domNode) {
			$domNode = updateNode($domNode, selector, selectors[selector]);
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

exports.doRender = function(str, selectors) {
	if(!selectors){
		return str;
	}
	var selectors = ( typeof selectors[0] == 'undefined' ) ? [selectors] : selectors; // make sure we have an array.
	var selectorCount = selectors.length;
	var out = [];
	selectors = selectors.reverse();
	while(selectorCount--){
		$ = cheerio.load(str);
		selectorIterator(selectors[selectorCount], $);
		out.push($.html());
	}
	return out.join('');
};

exports.__express = function(filename, options, callback) {
	var selectors = options.selectors;
	var wait = false;
	var count = 0; // keep track of total number of callbacks to wait for
	var complete = 0; // completed callbacks count.
	for(var key in selectors) {
		if(selectors[key] && selectors[key].partial){// this is a partial.
			if(selectors[key].data && selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.
				wait = true;
				count++;
				fs.readFile(options.settings.views + '/partials/' + selectors[key].partial + '.'+ options.settings['view engine'], 'utf8', function (key, err, data) {
					selectors[key] = exports.doRender(data, exports.classifyKeys(selectors[key].data, selectors[key]));	// adding and then stripping body tag for jsdom.
					complete++;
					if(complete === 1) {
						doRendering();
					}
				}.bind({}, key));
			}
		}
	}

	var doRendering = function() {
		if(options.layout) {
			fs.readFile(options.settings.views + '/' + options.layout + '.'+ options.settings['view engine'], 'utf8', function(error, template) {
				fs.readFile(filename, 'utf8', function(err,data){
				  if(err) {
				    console.error("Could not open file: %s", err);
				    process.exit(1);
				  }
				  var selectors = {};
				  selectors[options.container || '#container'] = data;
				  var markup = exports.doRender(template,  selectors) ;
				  callback(null, exports.doRender(markup, options.selectors));
				});
			});
		} else { // no layouts specified, just do the render.
			fs.readFile(filename, 'utf8', function(err,data){
			  if(err) {
			    console.error("Could not open file: %s", err);
			    process.exit(1);
			  }
			  callback(null, exports.doRender(data, options.selectors)	);
			});
		}
	}
	if(!wait) {
		doRendering();
	}
};