'use strict'

var newValue = require('./new-value')

var dom = require('../server/dom')

/**
 * Given the data part of a selector object, update the dom node. 
 * @param {*} $node 
 * @param {*} obj 
 * @returns 
 */
module.exports = function ($node, obj) {
  // Iterate over the actions to be applied to the dom node.
  for (var key in obj) {
    switch (key) {
      case 'className':
        dom.addClass($node, obj[key])
        break
      case 'innerHTML' :
        // if we need to apply something the each value we need to iterate over each dom node.
        if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
          $node.each(function (i, node) {
            var $domNode = dom.get(this)
            $domNode.innerHTML = obj[key]
          })
        } else {
          dom.setMarkup($node, obj[key])
        }
        break
      case 'innerText':

        // if we need to apply something the each value we need to iterate over each dom node.
        if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
          dom.newValue($node, obj[key])
        } else {
          $node.text(obj[key])
        }
        break

      default:
        if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {          
          var newText = newValue(dom.getAttribute($node, key), obj[key])
          dom.setAttribute($node, key, newText)
        } else {
          dom.setAttribute($node, key, obj[key])
        }
    }
  }
  return $node
}
