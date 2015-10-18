'use strict';

var dom = require('../server/dom.js');

var selectorIterator = require('./selector-iterator');
var updateNode =  require('./update-node');

module.exports = function(str, selectors) {
    if (!selectors){
        return str;
    }
    selectors = ( typeof selectors[0] === 'undefined' ) ? [selectors] : selectors; // make sure we have an array.
    var selectorCount = selectors.length;
    var out = [];
    selectors = selectors.reverse();
    var $page = dom.load(str);
    // iterate over the array.
    while (selectorCount--){
        Object.keys(selectors[selectorCount]).forEach(function(selector) {
//             $page(selector).text(selectors[selectorCount][selector]);
             updateNode(dom.find($page, selector), selector, selectors[selectorCount][selector]);
        });
	}


    if(dom.getMarkup) { // browserside
        return dom.getMarkup($page);
    } else {
        return $page.html();
    }
};
