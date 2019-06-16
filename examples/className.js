var sizlate = require('sizlate')

var html = '<div><a class="class1"></a></div>'
var selectors = {
  'div a': {
    className: 'class2'
  }
}
var out = sizlate.render(html, selectors)
console.log(out)
