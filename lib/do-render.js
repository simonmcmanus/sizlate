'use strict'

var dom = require('../server/dom')
var _loadSelectors = require('./update-node')

module.exports = function (str, selectors) {

  if (!selectors) {
    return str
  }

  selectors = (typeof selectors[0] === 'undefined') ? [selectors] : selectors // make sure we have an array.
  var selectorCount = selectors.length
  selectors = selectors.reverse()
  var $root
  var sourceType = null // so we can out the same thing we got in.
  if (typeof str === 'string') {
    $root = dom.load(str)
    sourceType = 'string'
  } else {
    $root = str // its already a dom obj
    sourceType = 'dom'
  }


  while (selectorCount--) {
    _loadSelectors($root, selectors[selectorCount])
  }

  if (dom.getMarkup) { // browserside
    if (sourceType === 'string') {
      return $root.innerHTML
    } else if (sourceType === 'dom') {
      return $root
    }
  } else {
    return $root.html()
  }
}
