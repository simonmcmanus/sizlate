'use strict';

var $ = require('jquery');
exports.load = function (str) {
    return $(str);
};

exports.find = function ($domNode, selector) {
    var $out = $domNode.filter(selector);
    if (!$domNode.length) { // filter doesnt catch em all.
        $out = $.find(selector); // jquery
    }
    return $out;
};

// only available in the browser
exports.getMarkup = function($page) {
    if($page[0]) {
        return $page[0].outerHTML;
    }else {
        return '';
    }

};

// iterate of dom nodes.
exports.each = function(node) {
    return $(node).each;
}

// jqueryify node
exports.get = function(item) {
    return $(item);
};
