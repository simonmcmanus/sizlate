var sizlate = require('sizlate');

var html = '<div><div class="class1"><a></a></div></div>';
var selectors = {
        selectors: {
          a: 'change links to this'
        }
};
var out = sizlate.render(html, selectors);
console.log(out);
