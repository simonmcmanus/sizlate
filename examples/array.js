var sizlate = require('sizlate');

var html = '<ul><li></li></ul>';
var selectors = {
    'li': [
        'change links to this',
        'change links to this2',
        {
            'href': 'df',
            innerHTML: 'aaa'
        }
    ]
};
var out = sizlate.render(html, selectors);
console.log(out);
