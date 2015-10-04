'use strict';

var cheerio = require('cheerio');

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
    var $page = cheerio.load(str);
    // iterate over the array.
    while (selectorCount--){
        Object.keys(selectors[selectorCount]).forEach(function(selector) {
//             $page(selector).text(selectors[selectorCount][selector]);
//

             updateNode($page(selector), selector, selectors[selectorCount][selector]);
             console.log('html is:', $page.html());
        });
	}
	return $page.html();
};
