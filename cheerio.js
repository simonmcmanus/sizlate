var markup = "<ul><li>hi</li><li>bye</li></ul>";

var $ = require('cheerio');



var dom = $.load(markup);

console.log(dom('li'))

dom.find('li').each(function() {
    console.log('hi')
})




// $('li', markup).each(function(i, item) {
//     console.log('item', $(item).text())
// })

