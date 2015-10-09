var cheerio = require('cheerio');

exports.load = function(str) {
    return cheerio.load(str);
};


exports.find = function($item, selector) {
    return $item(selector);
};



// // iterate of dom nodes.
// exports.each = function(node) {
//     //console.log('node', node.each);
//     return function(callback) {
//         return node.each(callback);
//
//     }
// }

// jqueryify node
exports.get = function(item) {
    return item;
};
