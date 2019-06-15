var cheerio = require('cheerio')

var updateNode = require('../lib/update-node')
var newValue = require('../lib/new-value')

exports.load = function (str) {
  return cheerio.load(str)
}

exports.find = function ($item, selector) {
  return $item(selector)
}

// jqueryify node
exports.get = function (item) {
  return item
}

exports.init = function (item) {
  return cheerio(item)
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
  return $node[0].name.toUpperCase()
}

exports.setText = function ($node, value) {
  return $node.text(value)
}

exports.query = function ($node, selector) {
  return $node.find(selector)
}

exports.updateNodes = function ($nodes, selector, data) {
  updateNode($nodes, selector, data) // might need to clone the node here. 
}

exports.newValue = function ($node, selectors) {
  $node.each(function (i, node) {
    var $node = exports.init(node)
    var newText = newValue(exports.getText($node), selectors)
    exports.setText($node, newText)
  })
}
