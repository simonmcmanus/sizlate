'use strict'
var checkForInputs = require('./check-for-inputs')
var updateNodeWithObject = require('./update-node-with-object')

function updateNode ($node, selector, data, $) {

  if (selector === '.id') {
    $node.attr('id', data)
    return $node
  }
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
        var $parent = $node.parentNode
        if (data.length === 1 && data[0] === false) { // [ false ]
          return $parent.remove()
        }
        var $newNode = $node.cloneNode()
        data.forEach(function (item, c) {
          var $itemNode = $newNode.cloneNode()
          if (c === 0) {
            $node.remove()
          }
          var $updatedNode = updateNode($itemNode, selector, data[c], $)
          $parent.appendChild($updatedNode)
        })
      } else {
        $node = updateNodeWithObject($node, data, $)
      }
      break
  }
  return $node
}

module.exports = updateNode
