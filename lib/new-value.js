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
