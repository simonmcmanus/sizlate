'use strict';

var newValue = require('./new-value');

var dom = require('../server/dom');

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
				$node.addClass( obj[key] );
			break;
			case'innerHTML' :

				// if we need to apply something the each value we need to iterate over each dom node.
				if (obj[key].regex || typeof obj[key] === 'function') {
					$node.each(function(i, node) {
						var $domNode = dom.get(node);
						let newText = newValue($domNode.html(), obj[key]);
						$domNode.html( obj[key] );
					})
				}else {
					$node.html( obj[key] );
				}
			break;
			case'innerText' :

				// if we need to apply something the each value we need to iterate over each dom node.
				if (obj[key].regex || typeof obj[key] === 'function') {
					$node.each(function(i, node) {
						var $domNode = dom.get(this);
						let newText = newValue($domNode.text(), obj[key]);
						console.log('hi text', node[i], this, $domNode , newText);
						$domNode.text(newText);
					})
				}else {
					console.log('hi there bob');
					$node.text(obj[key]);
				}
			break;

			default:
				if (obj[key].regex || typeof obj[key] === 'function') {
					$node.each(function (i, node) {
						var $domNode = dom.get(node);
						let newText = newValue($domNode.attr(key), obj[key]);
						$domNode.attr(key, newText);
					})
				}else {
					$node.attr( key, obj[key] );
				}
		}
	}
	return $node;
};
