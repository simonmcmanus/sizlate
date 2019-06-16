var sizlate = require('sizlate')

var html = '<div><a></a></div>'
var selectors = {
  'a': {
    href: 'http://yahoo.com',
    title: 'yahoo',
    innerHTML: 'yahoo'
  }
}
var out = sizlate.render(html, selectors)
console.log(out)
