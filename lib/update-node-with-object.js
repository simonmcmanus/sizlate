'use strict';

var cheerio = require('cheerio')
var newValue = require('./new-value');

var dom = require('../server/dom');

module.exports = function ($node, obj) {
    // Iterate over the actions to be applied to the dom node.
    for (var key in obj){
        switch (key) {
            case 'selectors':
                var selectors = obj[key];
                for (var selector in selectors) {
                    // really this should call update-node. so that it can handle something other than html.
                    $node.find(selector).html(selectors[selector]);
                }
            break;
            case 'className':
                $node.addClass(obj[key]);
            break;
            case'innerHTML' :
                // if we need to apply something the each value we need to iterate over each dom node.
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
                    $node.each(function (i, node) {
                        var $domNode = dom.get(this);
                        $domNode.html(obj[key]);
                    });
                }else {
                    $node.html(obj[key]);
                }
            break;
            case'innerText' :

                // if we need to apply something the each value we need to iterate over each dom node.
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function' ) {

                    $node.each(function (i, node) {
                        var $node = dom.init(node);
                        var newText = newValue($node.text(), obj[key]);
                        $node.text(newText);
                    });
                }else {
                    $node.text(obj[key]);
                }
            break;

            default:
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
                    $node.each(function (i, node) {
                        var newText = newValue(node.attribs[key], obj[key]);
                        node.attribs[key] = newText;
                    });
                }else {
                    $node.attr(key, obj[key]);
                }
        }
    }
    return $node;
};
