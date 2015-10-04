'use strict';

var newValue = require('./new-value');

module.exports = function($node, obj) {



	// Iterate over the actions to be applied to the dom node.
	for (var key in obj){

		console.log('got obj', obj, key)
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

			break;

			default:
			var value = newValue( $node.attr(key), obj[key] );
			$node.attr( key, value );
			console.log('markuop', $node.html())
		}

	}
	return $node;
};
