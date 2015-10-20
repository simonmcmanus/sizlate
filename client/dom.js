'use strict';

exports.load = function (str) {
    return $(str);
};

exports.find = function ($domNode, selector) {
    var out = $domNode.filter(selector);;
    if (out.length > 0) { // filter doesnt catch em all.
        return out;
    }else {
        return $domNode.find(selector); // jquery
    }
};

// only available in the browser
exports.getMarkup = function ($page) {
    var out = [];
    $page.each(function (i, item) {
        out.push(item.outerHTML);
    });
    return out.join('');
};

// jqueryify node
exports.get = function (item) {
    return $(item);
};
