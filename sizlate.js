// var fs = require('fs');
// var cheerio = require('cheerio');
// exports.version = '0.9.0';
var exports = {};

var dom = function(str) {
	return $(str);
};


var get = function( file, callback ) {
	fs.readFile(options.settings.views + file, 'utf8', callback);
};
/*

always called relative to the view directory
 */
var get = function(file, callback) {
	console.log('file', file);
	$.get('/targets/views/' + file  + '.sizlate', function(markup) {
		callback(null, markup);
	});
};


(function(exports, dom, get) {
	var checkForInputs = function($node, data) {
		$node.each(function(i, elem) {
			if(this[0] && this[0].name === 'input') {
				$(this[0]).attr('value', data);
			}else {
				$(this[0]).html(data);
			}
		});
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

	var selectorIterator = function(selectors, $html) {
		for(var selector in selectors) {
			if(typeof selectors[selector] === 'function') {
				break;
			}
			var $domNode = $html.find(selector);
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
		while(selectorCount--){
			sizzled = $(str);
			selectorIterator(selectors[selectorCount], sizzled);
			out.push(sizzled.html());
		}
		return out.join('');
	};

	exports.__express = function(filename	, options, callback) {

		var selectors = options.selectors;
		var wait = false;
		var count = 0; // keep track of total number of callbacks to wait for
		var complete = 0; // completed callbacks count.
		for(var key in selectors) {
			if(selectors[key] && selectors[key].partial){// this is a partial.
				if(selectors[key].data && selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.
					wait = true;
					count++;
					get('/partials/' + selectors[key].partial + '.sizlate', function (key, err, data) {
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
				get('/' + options.layout + '.'+ options.settings['view engine'], function(error, template) {
					get(filename, function(err,data){
					  var selectors = {};
					  selectors[options.container || '#container'] = data;
					  var markup = exports.doRender(template,  selectors);
					  callback(null, exports.doRender(markup, options.selectors));
					});
				});
			} else { // no layouts specified, just do the render.
				get(filename, function(err,data){
					var out = exports.doRender(data, options.selectors);
				  callback(null, out);
				});
			}
		}
		if(!wait) {
			doRendering();
		}
	};
	exports.interface = exports.__express;


})(exports, dom, get);
