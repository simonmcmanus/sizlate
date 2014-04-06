var sizlate = require('../sizlate.js');

describe('When given tag selector ', function() {
	it("it should set the innerHTML", function(done) {
		var out = sizlate.doRender('<div></div>', {'div': 'hi'});
		var expected = '<div>hi</div>';
		expect(expected).toEqual(out);
		done();
	});
});

describe('When given a id selector ', function() {
	it("it should set the innerHTML", function(done) {
		var out = sizlate.doRender('<div id="one"></div>', {'#one': 'hi'});
		var expected = '<div id="one">hi</div>';
		expect(expected).toEqual(out);
		done();
	});
});

describe('When given a id selector ', function() {
	it("it should set the innerHTML", function(done) {
		var out = sizlate.doRender('<div class="one"></div>', {'.one': 'hi'});
		var expected = '<div class="one">hi</div>';
		expect(expected).toEqual(out);
		done();
	});
});

describe('When given an object ', function() {
	it("it should set the appropriate attributes", function(done) {
		var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'data-thing': 'bobby'}});
		var expected = '<div class="one" data-thing="bobby"></div>';
		expect(expected).toEqual(out);
		done();
	});
});

describe('When given an object with more than one attribute', function() {
	it("it should set the appropriate attributes", function(done) {
		var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'data-thing': 'bobby', 'data-foobar': 'beepboop'}});
		var expected = '<div class="one" data-thing="bobby" data-foobar="beepboop"></div>';
		expect(expected).toEqual(out);
		done();
	});
});

describe('When given an object containing innerHTML ', function() {
	it("it should set the innerHTML", function(done) {
		var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'innerHTML': 'bobby'}});
		var expected = '<div class="one">bobby</div>';
		expect(expected).toEqual(out);
		done();
	});
});


describe('When given an object containing className ', function() {
	it("it should set the class but not remove existing classes.", function(done) {
		var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'className': 'bobby'}});
		var expected = '<div class="one bobby"></div>';
		expect(expected).toEqual(out);
		done();
	});
});

describe('When given a value to edit', function() {
	it("it should perform the expected transformation", function(done) {
		var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'className': 'bobby'}});
		var expected = '<div class="one bobby"></div>';
		expect(expected).toEqual(out);
		done();
	});
});

describe('When given a text value', function() {
	it("it should escape HTML values", function(done) {
		var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'innerText': 'Well this is a little <b>awkward</b>'}});
		var expected = '<div class="one">Well this is a little &lt;b&gt;awkward&lt;/b&gt;</div>';
		expect(expected).toEqual(out);
		done();
	});
});


describe('When given a regex', function() {
	it("it should allow simple replacing", function(done) {
		var out = sizlate.doRender('<div class="one">existing value</div>', {
			'.one': {
				'innerText' : {
					regex : /existing (value)/ig,
					value : "new $1"
				}
			}
		});
		var expected = '<div class="one">new value</div>';
		expect(expected).toEqual(out);
		done();
	});
	
	it("it should allow prepending a URL", function(done) {
		var out = sizlate.doRender('<a href="/some-path">existing value</a>', {
			'a': {
				'href' : {
					regex : /(.+)/ig,
					value : "http://yahoo.com$1"
				}
			}
		});
		var expected = '<a href="http://yahoo.com/some-path">existing value</a>';
		expect(expected).toEqual(out);
		done();
	});
});
