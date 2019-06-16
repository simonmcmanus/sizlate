'use strict'

var newValue = require('./new-value')

var dom = require('../server/dom')

module.exports = function ($node, obj) {
  // Iterate over the actions to be applied to the dom node.
  for (var key in obj) {
    //   console.log('key', $node, key, obj[key])
    switch (key) {
      case 'selectors':
        var selectors = obj[key]
        for (var selector in selectors) {
          // really this should call update-node. so that it can handle something other than html.

          var $item = dom.query($node, selector)
          dom.setMarkup($item, selectors[selector])        
        }
        break
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
          //$node.each(function (i, node) {
          var newText = newValue(dom.getAttribute($node, key), obj[key])
          dom.setAttribute($node, key, newText)
          //})
        } else {
          dom.setAttribute($node, key, obj[key])
        }
    }
  }
  return $node
}
