function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// given a regex or function updates the value.
var newValue = function (oldValue, newValue) {

  if (typeof newValue === 'object' && newValue.regex && newValue.value) {
    return oldValue.replace(newValue.regex, newValue.value)
  } else if (typeof newValue === 'function') {
    return newValue(oldValue)
  }
  return newValue
};

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
  return $node.cloneNode(true)
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


exports.newValue = function ($node, selectors) {
  var newText = newValue(exports.getText($node), selectors);
  exports.setText($node, newText);
};
});
dom.load;
dom.init;
dom.find;
dom.getMarkup;
dom.setMarkup;
dom.get;
dom.setAttribute;
dom.getAttribute;
dom.addClass;
dom.clone;
dom.append;
dom.parent;
dom.getTag;
dom.getText;
dom.setText;
dom.query;
dom.newValue;

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

/**
 * Given the data part of a selector object, update the dom node. 
 * @param {*} $node 
 * @param {*} obj 
 * @returns 
 */
var updateNodeWithObject = function ($node, obj) {

  // Iterate over the actions to be applied to the dom node.
  for (var key in obj) {
    switch (key) {
      
      case 'className':
        dom.addClass($node, obj[key]);
        break
      case 'innerHTML' :
        // if we need to apply something the each value we need to iterate over each dom node.
        if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
          $node.each(function (i, node) {
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

/**
 * @param {*} $node - dom node
 * @param {object} values  - eg { className: 'bacon', selectors: {...}}
 */
var handleObject = ($node, values) => {
    if(values.selectors) {
        _loadSelectors($node, values.selectors);
    }
    delete values.selectors;
    return updateNodeWithObject($node, values)
};

/**
 * 
 * @param {object} $node - dom node
 * @param {string|boolean|number|object|array} values - eg { className: 'bacon', selectors: {...}}
 */
var _byDataType = ($node, values) => {
    if(values === null) {
        return $node
    }
    switch (typeof values) {
        case 'string':
            if (values !== '') {
                checkForInputs($node, values);
            }
        break
        case 'number':
            checkForInputs($node, values);
        break
        case 'boolean':
            if (values === false) {
                return $node.remove()
            }
        break
        case 'object': 
            if(values && values.length) {
                const $parent = dom.parent($node);
                values.forEach((value) => {
                    const $newNode = dom.clone($node);    
                    _byDataType($newNode, value);
                    dom.append($parent, $newNode);
                });
                $node.remove();
            }else {
                 handleObject($node, values);
            }
        break
    }
};

/**
 * 
 * @param {object} $node  - dom node
 * @param {*} selectors - eg { a: 'hello', li: [{}, 'li']}
 */
var _loadSelectors = ($node, selectors) => {
    Object.entries(selectors).forEach(([selector, values]) => {
        var $found = dom.find($node, selector);
        $found.forEach(($item) => {
            _byDataType($item, values);
        });
    });
 };


 var nestedArray =   _loadSelectors;

var doRender = function (str, selectors) {

  if (!selectors) {
    return str
  }

  selectors = (typeof selectors[0] === 'undefined') ? [selectors] : selectors; // make sure we have an array.
  var selectorCount = selectors.length;
  selectors = selectors.reverse();
  var $root;
  var sourceType = null; // so we can out the same thing we got in.
  if (typeof str === 'string') {
    $root = dom.load(str);
    sourceType = 'string';
  } else {
    $root = str; // its already a dom obj
    sourceType = 'dom';
  }


  while (selectorCount--) {
    nestedArray($root, selectors[selectorCount]);
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
};

var classifyKeys$1 = function (data, options) {
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
var classifyKeys = classifyKeys$1;

var sizlate = {
	render: render,
	classifyKeys: classifyKeys
};

export { classifyKeys, sizlate as default, render };
