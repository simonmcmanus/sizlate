var fs = require('fs');
var cheerio = require('cheerio');
exports.version = '0.7.10';

var checkForInputs = function($node, data) {
	$node.each(function(i, elem) {
		if(this[0].name === 'input') {
			$(this[0]).attr('value', data);
		}else {
			$(this[0]).html(data);
		}
	});
};
var updateNode = function($node, selector, data) {
	// if there are multiple using the same selector then need to be addressed here.
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
			for(var key in data){

				if(key === 'selectors') { // allow nested selectors
					$node.html(exports.doRender($node.html(), data[key]));
				}
				if(key == 'className'){
					$node.addClass(data[key]);
				}else {
					$node.attr(key, data[key]);
				}
			}
		break;
	}
	return $node;
};

var selectorIterator = function(selectors, $) {
	for(var selector in selectors) {
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
		return "";
	}
	$ = cheerio.load(str);
	var selectors = (typeof selectors[0] == 'undefined') ? [selectors] : selectors; // make sure we have an array.
	var selectorCount = selectors.length;
	var out = [];
	while(selectorCount--){
		selectorIterator(selectors[selectorCount], $);
		out.push($.html());
	}
	return out.join('');
};


exports.__express = function(filename, options, callback) {
	var fs = require('fs');
	var selectors = options.selectors;
	for(var key in selectors) {
		if(selectors[key] && selectors[key].partial){// this is a partial.
			if(selectors[key].data && selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.
				fs.readFile(options.settings.views + '/partials/' + selectors[key].partial + '.' + options.settings['view engine'], 'utf8', function (key, err, data) {
					selectors[key] = exports.doRender(data, exports.classifyKeys(selectors[key].data, selectors[key]));	// adding and then stripping body tag for jsdom.
				}.bind({}, key));
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
		  callback(null, exports.doRender(data, options.selectors)	 );
		});
	}
};
