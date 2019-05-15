'use strict'

exports.load = function (str) {
  return str
}

exports.find = function ($domNode, selector) {
    console.log($domNode)
  return $domNode.querySelector(selector)
}

// only available in the browser
exports.getMarkup = function ($page) {
  return $page
}

exports.setMarkup = function ($node, markup) {
  $node.innerHTML = markup
}

// jqueryify node
exports.get = function (item) {
  return item
}
