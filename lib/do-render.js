'use strict'

var dom = require('../server/dom.js')


module.exports = function (str, selectors) {
  if (!selectors) {
    return str
  }

  selectors = (typeof selectors[0] === 'undefined') ? [selectors] : selectors // make sure we have an array.
  var selectorCount = selectors.length
  selectors = selectors.reverse()
  var $page = dom.load(str)
  // iterate over the array.
  while (selectorCount--) {
    Object.keys(selectors[selectorCount]).forEach(function (selector) {
      var $nodes = dom.find($page, selector)
      dom.updateNodes($nodes, selector, selectors[selectorCount][selector])
      // $nodes.forEach(function ($node) {
      //   updateNode($node, selector, selectors[selectorCount][selector])  // might need to clone the node here. 
      // })
    })
  }

  if (dom.getMarkup) { // browserside
    return dom.getMarkup($page)
  } else {
    return $page.html()
  }
}
