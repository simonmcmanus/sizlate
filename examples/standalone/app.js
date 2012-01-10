var sizlate = require('sizlate');
var out = sizlate.doRender('<div><a href=""></a></div>', {'div a': 'UPDATED'});
console.log(out); // returns <div><a href="">UPDATED</a></div>