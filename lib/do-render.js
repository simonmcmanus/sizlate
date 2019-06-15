'use strict'

var dom = require('../server/dom.js')

module.exports = function (str, selectors) {

  if (!selectors) {
    return str
  }

  selectors = (typeof selectors[0] === 'undefined') ? [selectors] : selectors // make sure we have an array.
  var selectorCount = selectors.length
  selectors = selectors.reverse()
  var $page
  var sourceType = null // so we can out the same thing we got in.
  if (typeof str === 'string') {
    $page = dom.load(str)
    sourceType = 'string'
  } else {
    $page = str // its already a dom obj
    sourceType = 'dom'
  }
  // iterate over the array.
  while (selectorCount--) {
    Object.keys(selectors[selectorCount]).forEach(function (selector) {
      var $nodes = dom.find($page, selector)
      dom.updateNodes($nodes, selector, selectors[selectorCount][selector])
    })
  }

  if (dom.getMarkup) { // browserside
    if (sourceType === 'string') {
      return $page.innerHTML
    } else if (sourceType === 'dom') {
      return $page
    }
  } else {
    return $page.html()
  }
}
