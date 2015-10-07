'use strict';

var newValue = require('./new-value');

module.exports = function($node, obj) {
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

				// if we need to apply something the each value we need to iterate over each dom node.
				if (obj[key].regex || typeof obj[key] === 'function') {
					$node.each(function(i, $node) {
						let newText = newValue(this.text(), obj[key]);
						this.text(newText);
					})
				}else {
					$node.text(obj[key]);
				}
			break;

			default:
				if (obj[key].regex || typeof obj[key] === 'function') {
					$node.each(function() {
						let newText = newValue(this.attr(key), obj[key]);
						this.attr(key, newText);
					})
				}else {
					$node.attr( key, obj[key] );
				}
		}
	}
	return $node;
};
