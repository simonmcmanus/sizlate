var sizlate = require('sizlate');


var html = '<div><div id="one"><a href="sd"></a></div></div>';
var selectors = {
    '#one': {
        selectors: {
            a: 'wotcha'
        }
    }
};

var out = sizlate.render(html, selectors);
console.log(out);
