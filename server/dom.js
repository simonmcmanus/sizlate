var cheerio = require('cheerio');

exports.load = function(str) {
    return cheerio.load(str);
};

exports.find = function($item, selector) {
    return $item(selector);
};

// jqueryify node
exports.get = function(item) {
    return item;
};


exports.init = function(item) {
    return cheerio(item)
}