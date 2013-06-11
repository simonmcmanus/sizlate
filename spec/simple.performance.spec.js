var sizlate = require('../sizlate.js');

describe('When given tag selector ', function() {
	it("it should set the innerHTML", function(done) {
		var startTime = new Date().getTime(),
			i = 1000;
		while ( --i > 0 ) sizlate.doRender('<div></div>', {'div': 'hi'});
		expect(new Date().getTime() - startTime).toBeLessThan(400);
		done();
	});
});

describe('When given a id selector ', function() {
	it("it should set the innerHTML", function(done) {
		var startTime = new Date().getTime(),
			i = 1000;
		while ( --i > 0 ) sizlate.doRender('<div id="one"></div>', {'#one': 'hi'});
		expect(new Date().getTime() - startTime).toBeLessThan(400);
		done();
	});
});

describe('When given an object ', function() {
	it("it should set the appropriate attributes", function(done) {
		var startTime = new Date().getTime(),
			i = 1000;
		while ( --i > 0 ) sizlate.doRender('<div class="one"></div>', {'.one': { 'data-thing': 'bobby'}});
		expect(new Date().getTime() - startTime).toBeLessThan(400);
		done();
	});
});

describe('When given an object with more than one attribute', function() {
	it("it should set the appropriate attributes", function(done) {
		var startTime = new Date().getTime(),
			i = 1000;
		while ( --i > 0 ) sizlate.doRender('<div class="one"></div>', {'.one': { 'data-thing': 'bobby', 'data-foobar': 'beepboop'}});
		expect(new Date().getTime() - startTime).toBeLessThan(400);
		done();
	});
});

describe('When given an object containing innerHTML ', function() {
	it("it should set the innerHTML", function(done) {
		var startTime = new Date().getTime(),
			i = 1000;
		while ( --i > 0 ) sizlate.doRender('<div class="one"></div>', {'.one': { 'innerHTML': 'bobby'}});
		expect(new Date().getTime() - startTime).toBeLessThan(400);
		done();
	});
});


describe('When given an object containing className ', function() {
	it("it should set the class but not remove existing classes.", function(done) {
		var startTime = new Date().getTime(),
			i = 1000;
		while ( --i > 0 ) sizlate.doRender('<div class="one"></div>', {'.one': { 'className': 'bobby'}});
		expect(new Date().getTime() - startTime).toBeLessThan(400);
		done();
	});
});
