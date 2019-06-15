'use strict'

var updateNode = require('../lib/update-node')
var newValue = require('../lib/new-value')

exports.load = function (html) {
  var template = document.createElement('div')
  template.innerHTML = html.trim()
  return template
}

exports.init = function (str) {
  return str
}

exports.find = function ($domNode, selector) {
  return $domNode.querySelectorAll(selector)
}

// only available in the browser
exports.getMarkup = function ($page) {
  var container = document.createElement('div')
  container.appendChild($page.cloneNode(true))
  return container.innerHTML
}

exports.setMarkup = function ($node, markup) {
  $node.innerHTML = markup
}

exports.get = function (item) {
  return item
}
exports.setAttribute = function ($node, attribute, value) {
  $node.setAttribute(attribute, value)
}

exports.getAttribute = function ($node, attribute) {
  return $node.getAttribute(attribute)
}

exports.addClass = function ($node, className) {
  $node.classList.add(className)
}

exports.clone = function ($node) {
  return $node.cloneNode()
}

exports.append = function ($parent, $node) {
  return $parent.appendChild($node)
}

exports.parent = function ($node) {
  return $node.parentNode
}

exports.getTag = function ($node) {
  return $node.tagName.toUpperCase()
}

exports.getText = function ($node) {
  return $node.innerText
}

exports.setText = function ($node, value) {
  $node.innerText = value
  return $node
}

exports.query = function ($node, selector) {
  return $node.querySelector(selector)
}

exports.updateNodes = function ($nodes, selector, data) {
  $nodes.forEach(function ($node) {
    updateNode($node, selector, data)  // might need to clone the node here.
  })
}

exports.newValue = function ($node, selectors) {
  var newText = newValue(exports.getText($node), selectors)
  exports.setText($node, newText)
}
