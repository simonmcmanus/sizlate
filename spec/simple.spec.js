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
