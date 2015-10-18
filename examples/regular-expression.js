var sizlate = require('sizlate');

var html = '<div><a>existing text</a></div>';
var selectors = {
    'a': {
        'innerText': {
            regex: /existing ([a-z]+)/ig,
            value: 'new $1'
        }
    }
};
var out = sizlate.render(html, selectors);
console.log(out);
