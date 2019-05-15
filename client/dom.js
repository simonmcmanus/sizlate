'use strict'

exports.load = function (str) {
  var template = document.createElement('template')
  var html = str.trim()
  template.innerHTML = html
  return template.content
}

exports.init = function (str) {
  return str
}

exports.find = function ($domNode, selector) {
  return $domNode.querySelectorAll(':scope ' + selector)
}

// only available in the browser
exports.getMarkup = function ($page) {
  var container = document.createElement('div')
  container.appendChild( $page.cloneNode(true) )
  return container.innerHTML
}

exports.setMarkup = function ($node, markup) {
  $node.innerHTML = markup
}

// jqueryify node
exports.get = function (item) {
  return item
}
