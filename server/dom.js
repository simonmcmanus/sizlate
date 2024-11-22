var cheerio = require('cheerio')

var newValue = require('../lib/new-value')

exports.load = function (str) {
  return cheerio.load(str, null, false).root()
}

exports.find = function ($item, selector) {
  // returns an array to be consistent with cheerio find. 
  return [$item.find(selector)]
}

// jqueryify node
exports.get = function (item) {
  return item
}

exports.init = function (item) {
  return cheerio.load(item, null, false)
}

exports.setMarkup = function ($node, html) {
  $node.html(html)
}

exports.setAttribute = function ($node, attribute, value) {
  $node.attr(attribute, value)
}

exports.getAttribute = function ($node, attribute) {
  return $node.attr(attribute)
}

exports.addClass = function ($node, className) {
  $node.addClass(className)
}

exports.addClass = function ($node, className) {
  $node.addClass(className)
}

exports.clone = function ($node) {
  return $node.clone()
}

exports.append = function ($parent, $node) {
  return $parent.append($node)
}

exports.parent = function ($node) {
  return $node.parent()
}

exports.getText = function ($node) {
  return $node.text()
}

exports.getTag = function ($node) {
  return $node[0] && $node[0].name.toUpperCase()
}

exports.setText = function ($node, value) {
  return $node.text(value)
}

exports.query = function ($node, selector) {
  return $node.find(selector)
}

exports.newValue = function ($node, selectors) {
  $node.each(function (i, node) {
    const $subNode = $node._root.find(node)    
     var newText = newValue(exports.getText($subNode), selectors)
     exports.setText($subNode, newText)
  })
}
