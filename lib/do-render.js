'use strict';

var dom = require('../server/dom.js');

var updateNode =  require('./update-node');

module.exports = function (str, selectors) {
    if (!selectors){
        return str;
    }
    selectors = (typeof selectors[0] === 'undefined') ? [selectors] : selectors; // make sure we have an array.
    var selectorCount = selectors.length;
    selectors = selectors.reverse();
    var $page = dom.load(str);
    // iterate over the array.
    while (selectorCount--){
        Object.keys(selectors[selectorCount]).forEach(function (selector) {
            updateNode(dom.find($page, selector), selector, selectors[selectorCount][selector]);
        });
    }

    if (dom.getMarkup) { // browserside
        return $page;
    } else {
        return $page.html();
    }
};
