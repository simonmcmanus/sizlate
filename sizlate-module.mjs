function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * In the case of input we should update the value and not just set the innerHTML property.
 * @param  {Object} $node selector object
 * @param  {String} data  The value to be set on the html.
 */
var checkForInputs = function ($node, data) {
  if (dom.getTag($node) === 'INPUT') {
    dom.setAttribute($node, 'value', data);
  } else {
    dom.setMarkup($node, data);
  }
  return $node
};

// given a regex or function updates the value.
var newValue = function (oldValue, newValue) {

  if (typeof newValue === 'object' && newValue.regex && newValue.value) {
    return oldValue.replace(newValue.regex, newValue.value)
  } else if (typeof newValue === 'function') {
    return newValue(oldValue)
  }
  return newValue
};

var updateNodeWithObject = function($node, obj, updateNode) {
    // Iterate over the actions to be applied to the dom node.
    for (var key in obj) {
        //   console.log('key', $node, key, obj[key])
        switch (key) {
            case 'selectors':
                var selectors = obj[key];

                for (var selector in selectors) {
                    var $item = dom.query($node, selector);
                    if (typeof selectors[selector] === 'string') {
                        dom.setMarkup($item, selectors[selector]);
                    } else if (typeof selectors[selector] === 'object') {
                        updateNode && updateNode($item, selector, selectors[selector]);
                    }
                }
                break
            case 'className':
                dom.addClass($node, obj[key]);
                break
            case 'innerHTML':
                // if we need to apply something the each value we need to iterate over each dom node.
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
                    $node.each(function(i, node) {
                        var $domNode = dom.get(this);
                        $domNode.innerHTML = obj[key];
                    });
                } else {
                    dom.setMarkup($node, obj[key]);
                }
                break
            case 'innerText':

                // if we need to apply something the each value we need to iterate over each dom node.
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
                    dom.newValue($node, obj[key]);
                } else {
                    $node.text(obj[key]);
                }
                break

            default:
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
                    //$node.each(function (i, node) {
                    var newText = newValue(dom.getAttribute($node, key), obj[key]);
                    dom.setAttribute($node, key, newText);
                        //})
                } else {
                    dom.setAttribute($node, key, obj[key]);
                }
        }
    }
    return $node
};

function updateNode($node, selector, data) {
    if (selector === '.id') {
        $node.attr('id', data);
        return $node
    }
    switch (typeof data) {
        case 'string':
            if (data !== '') {
                $node = checkForInputs($node, data);
            }
            break
        case 'number':
            $node = checkForInputs($node, data);
            break
        case 'boolean':
            if (data === false) {
                return $node.remove()
            }
            break
        case 'object':
            if (data && data.length) {
                var $parent = dom.parent($node);
                if (data.length === 1 && data[0] === false) { // [ false ]
                    return $parent.remove()
                }
                var $newNode = dom.clone($node);
                data.forEach(function(item, c) {
                    var $itemNode = dom.clone($newNode);
                    if (c === 0) {
                        $node.remove();
                    }
                    var $updatedNode = updateNode($itemNode, selector, data[c]);
                    dom.append($parent, $updatedNode);
                });
            } else {
                $node = updateNodeWithObject($node, data, updateNode);
            }
            break
    }
    return $node
}

var updateNode_1 = updateNode;

var dom = createCommonjsModule(function (module, exports) {




exports.load = function (html) {
  var template = document.createElement('div');
  template.innerHTML = html.trim();
  return template
};

exports.init = function (str) {
  return str
};

exports.find = function ($domNode, selector) {
  return $domNode.querySelectorAll(selector)
};

// only available in the browser
exports.getMarkup = function ($page) {
  var container = document.createElement('div');
  container.appendChild($page.cloneNode(true));
  return container.innerHTML
};

exports.setMarkup = function ($node, markup) {
  $node.innerHTML = markup;
};

exports.get = function (item) {
  return item
};
exports.setAttribute = function ($node, attribute, value) {
  $node.setAttribute(attribute, value);
};

exports.getAttribute = function ($node, attribute) {
  return $node.getAttribute(attribute)
};

exports.addClass = function ($node, className) {
  $node.classList.add(className);
};

exports.clone = function ($node) {
  return $node.cloneNode()
};

exports.append = function ($parent, $node) {
  return $parent.appendChild($node)
};

exports.parent = function ($node) {
  return $node.parentNode
};

exports.getTag = function ($node) {
  return $node.tagName.toUpperCase()
};

exports.getText = function ($node) {
  return $node.innerText
};

exports.setText = function ($node, value) {
  $node.innerText = value;
  return $node
};

exports.query = function ($node, selector) {
  return $node.querySelector(selector)
};

exports.updateNodes = function ($nodes, selector, data) {
  $nodes.forEach(function ($node) {
    updateNode_1($node, selector, data);  // might need to clone the node here.
  });
};

exports.newValue = function ($node, selectors) {
  var newText = newValue(exports.getText($node), selectors);
  exports.setText($node, newText);
};
});
var dom_1 = dom.load;
var dom_2 = dom.init;
var dom_3 = dom.find;
var dom_4 = dom.getMarkup;
var dom_5 = dom.setMarkup;
var dom_6 = dom.get;
var dom_7 = dom.setAttribute;
var dom_8 = dom.getAttribute;
var dom_9 = dom.addClass;
var dom_10 = dom.clone;
var dom_11 = dom.append;
var dom_12 = dom.parent;
var dom_13 = dom.getTag;
var dom_14 = dom.getText;
var dom_15 = dom.setText;
var dom_16 = dom.query;
var dom_17 = dom.updateNodes;
var dom_18 = dom.newValue;

var doRender = function (str, selectors) {

  if (!selectors) {
    return str
  }

  selectors = (typeof selectors[0] === 'undefined') ? [selectors] : selectors; // make sure we have an array.
  var selectorCount = selectors.length;
  selectors = selectors.reverse();
  var $page;
  var sourceType = null; // so we can out the same thing we got in.
  if (typeof str === 'string') {
    $page = dom.load(str);
    sourceType = 'string';
  } else {
    $page = str; // its already a dom obj
    sourceType = 'dom';
  }
  // iterate over the array.
  while (selectorCount--) {
    Object.keys(selectors[selectorCount]).forEach(function (selector) {
      var $nodes = dom.find($page, selector);
      dom.updateNodes($nodes, selector, selectors[selectorCount][selector]);
    });
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
};

var classifyKeys = function (data, options) {
  if (!options.classifyKeys || typeof data === 'undefined') {
    return data
  }
  var c = data.length;
  var retArray = [];
  while (c--) {
    var newObj = {};
    for (var key in data[c]) {
      newObj['.' + key] = data[c][key];
    }
    retArray.push(newObj);
  }
  return retArray
};

var render = doRender;
var classifyKeys$1 = classifyKeys;

var sizlate = {
	render: render,
	classifyKeys: classifyKeys$1
};

export default sizlate;
export { classifyKeys$1 as classifyKeys, render };
