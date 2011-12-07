require('should');


var sizlate = require('sizlate');

sizlate.doRender('<a>boby</a>', { a : 'foo' }).should.equal('<a>foo</a>');
sizlate.doRender('<a class="foo">FAIL</a>', { 'a.foo' : 'PASS' }).should.equal('<a class="foo">PASS</a>');
sizlate.doRender('<a id="foo">FAIL</a>', { 'a#foo' : 'PASS' }).should.equal('<a id="foo">PASS</a>');
sizlate.doRender('<div><a class="foo">FAIL</a></div>', { 'div a.foo' : 'PASS' }).should.equal('<div><a class="foo">PASS</a></div>');
sizlate.doRender('<div><a id="foo">FAIL</a></div>', { 'div a#foo' : 'PASS' }).should.equal('<div><a id="foo">PASS</a></div>');

console.log('>>>>>> TESTS COMPLETED - ALL PASSED <<<<<');

/*
someAsyncTask(foo, function (err, result) {
	should.not.exist(err);
	user.should.have.property('pets').with.lengthOf(4)
    should.exist(result);
    result.bar.should.equal(foo);
});

*/