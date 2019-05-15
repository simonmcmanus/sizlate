(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.sizlate = require('../sizlate');

},{"../sizlate":9}],2:[function(require,module,exports){
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
  return $page.firstChild.outerHTML
}

exports.setMarkup = function ($node, markup) {
  console.log('\->', $node, markup)

  $node.innerHTML = markup
}

// jqueryify node
exports.get = function (item) {
  return item
}

},{}],3:[function(require,module,exports){


var dom = require('../server/dom')
/**
 * In the case of input we should update the value and not just set the innerHTML property.
 * @param  {Object} $node sizzle object
 * @param  {String} data  The value to be set on the html.
 */
module.exports = function ($node, data) {

  //$node.forEach(function (i, elem) {
    //var type = elem.tagName

    // if (this[i] && this[i].name) {
    //   type = this[i].name
    // } else {
    //   type = 'none'
    // }
    // if (type.toUpperCase() === 'INPUT') {
    //   $node[i].attr('value', data)
    // } else {

      dom.setMarkup($node, data)
    //}
  //})
  return $node
}

},{"../server/dom":2}],4:[function(require,module,exports){
'use strict'

module.exports = function (data, options) {
  if (!options.classifyKeys || typeof data === 'undefined') {
    return data
  }
  var c = data.length
  var retArray = []
  while (c--) {
    var newObj = {}
    for (var key in data[c]) {
      newObj['.' + key] = data[c][key]
    }
    retArray.push(newObj)
  }
  return retArray
}

},{}],5:[function(require,module,exports){
'use strict'

var dom = require('../server/dom.js')

var updateNode = require('./update-node')

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
      console.log('nodes', $nodes)

      $nodes.forEach(function ($node) {

        updateNode($node, selector, selectors[selectorCount][selector])  

      })
    })
  }

  if (dom.getMarkup) { // browserside
    return dom.getMarkup($page)
  } else {
    return $page.html()
  }
}

},{"../server/dom.js":2,"./update-node":8}],6:[function(require,module,exports){
'use strict'

// given a regex or function updates the value.
module.exports = function (oldValue, newValue) {

  if (typeof newValue === 'object' && newValue.regex && newValue.value) {
    return oldValue.replace(newValue.regex, newValue.value)
  } else if (typeof newValue === 'function') {
    return newValue(oldValue)
  }
  return newValue
}

},{}],7:[function(require,module,exports){
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
          $node.find(selector).html(selectors[selector])
        }
        break
      case 'className':
        $node.classList.add(obj[key])
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
          console.log('nn', $node)
          $node.each(function (i, node) {
            var $node = dom.init(node)
            var newText = newValue($node.text(), obj[key])
            $node.text(newText)
          })
        } else {
          $node.text(obj[key])
        }
        break

      default:
        if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
          $node.each(function (i, node) {
            var newText = newValue(node.attribs[key], obj[key])
            node.attribs[key] = newText
          })
        } else {
          $node.setAttribute(key, obj[key])
        }
    }
  }
  return $node
}

},{"../server/dom":2,"./new-value":6}],8:[function(require,module,exports){
'use strict'
var checkForInputs = require('./check-for-inputs')
var updateNodeWithObject = require('./update-node-with-object')

function updateNode ($node, selector, data, $) {

  console.log('update node', $node) // its a list at this point not a node. 
  if (selector === '.id') {
    $node.attr('id', data)
    return $node
  }
  console.log(typeof data, $node, data)
  switch (typeof data) {
    case 'string':
      if (data !== '') {
        $node = checkForInputs($node, data)
      }
      break
    case 'number':
      $node = checkForInputs($node, data)
      break
    case 'boolean':
      if (data === false) {
        return $node.remove()
      }
      break
    case 'object':
      if (data && data.length) {
        var $parent = $node.parent()
        if (data.length === 1 && data[0] === false) { // [ false ]
          return $parent.remove()
        }
        var $newNode = $node.clone()
        data.forEach(function (item, c) {
          var $itemNode = $newNode.clone()
          if (c === 0) {
            $node.remove()
          }
          var $updatedNode = updateNode($itemNode, selector, data[c], $)
          $parent.append($updatedNode)
        })
      } else {
        console.log('->', 1)
        $node = updateNodeWithObject($node, data, $)
      }
      break
  }
  return $node
}

module.exports = updateNode

},{"./check-for-inputs":3,"./update-node-with-object":7}],9:[function(require,module,exports){
exports.render = require('./lib/do-render')
exports.classifyKeys = require('./lib/classify-keys')

},{"./lib/classify-keys":4,"./lib/do-render":5}]},{},[1]);
