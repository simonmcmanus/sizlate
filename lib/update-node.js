var checkForInputs = require('./check-for-inputs')
var updateNodeWithObject = require('./update-node-with-object')
var dom = require('../server/dom')


/**
 * @param {*} $node - dom node
 * @param {object} values  - eg { className: 'bacon', selectors: {...}}
 */
var handleObject = ($node, values) => {
    if(values.selectors) {
        _loadSelectors($node, values.selectors)
    }
    delete values.selectors
    return updateNodeWithObject($node, values)
}

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
                checkForInputs($node, values)
            }
        break
        case 'number':
            checkForInputs($node, values)
        break
        case 'boolean':
            if (values === false) {
                return $node.remove()
            }
        break
        case 'object': 
            if (values && values.length == 0) {
               $node.remove()
             
         } else if(values && values.length > 0) {
                const $parent = dom.parent($node)
                values.forEach((value) => {
                    const $newNode = dom.clone($node)    
                    _byDataType($newNode, value)
                    dom.append($parent, $newNode)
                })
                $node.remove()
            }else {
                 handleObject($node, values)
            }
        break
    }
}

/**
 * 
 * @param {object} $node  - dom node
 * @param {*} selectors - eg { a: 'hello', li: [{}, 'li']}
 */
var _loadSelectors = ($node, selectors) => {
    Object.entries(selectors).forEach(([selector, values]) => {
        var $found = dom.find($node, selector)
        $found.forEach(($item) => {
            _byDataType($item, values)
        })
    })
 }

 module.exports =   _loadSelectors
