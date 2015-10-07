'use strict';
var checkForInputs = require('./check-for-inputs');
var updateNodeWithObject = require('./update-node-with-object');

module.exports = function($node, selector, data, $) {

	if (selector === '.id'){
		$node.attr('id', data);
		return $node;
	}
	switch (typeof data) {
		case 'string':


			if (data !== ''){
				$node = checkForInputs($node, data, $);
			}
		break;
		case 'number':
				$node = checkForInputs($node, data, $);
		break;
		case 'object':
			$node = updateNodeWithObject($node, data, $);
		break;
	}

	return $node;
};
