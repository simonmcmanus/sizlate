'use strict';
var checkForInputs = require('./check-for-inputs');
var updateNodeWithObject = require('./update-node-with-object');

function updateNode($node, selector, data, $) {

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
            if (data.length) {
                data.forEach(function (item, c) {
                    var $newNode = $node.clone();
                    $node.after($newNode);
					// if its the first item its the template so remove it.
					if (c === 0) {
						$node.remove();
					}
                    $node = updateNode($newNode , selector, data[c], $);
                });
           // its an array
        } else {
            $node = updateNodeWithObject($node, data, $);
        }
        break;
    }
    return $node;
};

module.exports = updateNode;
