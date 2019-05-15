'use strict'
var checkForInputs = require('./check-for-inputs')
var updateNodeWithObject = require('./update-node-with-object')

function updateNode ($node, selector, data, $) {

  console.log('update node', $node) // its a list at this point not a node. 
  if (selector === '.id') {
    $node.attr('id', data)
    return $node
  }
  console.log(typeof data, $node, data)
  switch (typeof data) {
    case 'string':
      if (data !== '') {
        $node = checkForInputs($node, data)
      }
      break
    case 'number':
      $node = checkForInputs($node, data)
      break
    case 'boolean':
      if (data === false) {
        return $node.remove()
      }
      break
    case 'object':
      if (data && data.length) {
        var $parent = $node.parent()
        if (data.length === 1 && data[0] === false) { // [ false ]
          return $parent.remove()
        }
        var $newNode = $node.clone()
        data.forEach(function (item, c) {
          var $itemNode = $newNode.clone()
          if (c === 0) {
            $node.remove()
          }
          var $updatedNode = updateNode($itemNode, selector, data[c], $)
          $parent.append($updatedNode)
        })
      } else {
        console.log('->', 1)
        $node = updateNodeWithObject($node, data, $)
      }
      break
  }
  return $node
}

module.exports = updateNode
