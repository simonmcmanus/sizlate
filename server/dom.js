var cheerio = require('cheerio');

exports.load = function(str) {
    return cheerio.load(str);
};


exports.find = function($item, selector) {
    return $item(selector);
};
