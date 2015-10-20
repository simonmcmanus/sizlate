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
                var $parent = $node.parent();
                var $newNode = $node.clone();
                data.forEach(function (item, c) {
                    var $itemNode = $newNode.clone();
                    if (c === 0) {
                        $node.remove();
                    }
                    var $updatedNode = updateNode($itemNode, selector, data[c], $);
                    $parent.append($updatedNode);
                });
            } else {
                $node = updateNodeWithObject($node, data, $);
            }
        break;
    }
    return $node;
}

module.exports = updateNode;
