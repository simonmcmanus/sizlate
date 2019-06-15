

var dom = require('../server/dom')
/**
 * In the case of input we should update the value and not just set the innerHTML property.
 * @param  {Object} $node sizzle object
 * @param  {String} data  The value to be set on the html.
 */
module.exports = function ($node, data) {
  if (dom.getTag($node) === 'INPUT') {
    dom.setAttribute($node, 'value', data)
  } else {
    dom.setMarkup($node, data)
  }
  return $node
}
