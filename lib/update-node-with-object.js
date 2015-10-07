'use strict';

var newValue = require('./new-value');

var cheerio = require('cheerio');

module.exports = function($node, obj, data, $) {
	// Iterate over the actions to be applied to the dom node.
	for (var key in obj){
		switch(key) {
			case 'selectors':

			// this needs to be documented.
				var selectors = obj[key];
				for(var selector in selectors) {
					$node.find(selector).html(selectors[selector]);
				}
			break;
			case 'className':
				//var value = newValue( $node.attr("class"), obj[key] );
				$node.addClass( obj[key] );
			break;
			case'innerHTML' :
				$node.html( obj[key] );
				//$node.html(newValue($node.html(), obj[key]));
			break;
			case'innerText' :
			// has the value of both items here already.

			$node.each(function(i, $node) {
				console.log(this.text(), obj[key]);
				let newText = newValue(this.text(), obj[key]);
				console.log(newText);
				this.text(newText);
			})

			//$node.text(newValue($node.text(), obj[key]));
				//$node.text( obj[key] );
			break;

			default:
			//var value = newValue( $node.attr(key), obj[key] );
			$node.attr( key, obj[key] );
		}
	}
	return $node;
};
