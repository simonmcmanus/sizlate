if(typeof require != 'undefined') { 
	sizlate = require('../sizlate.js');
}

describe('Given calling doRender ', function() {
	var out;



	describe('When called with a tag selector ', function() {
		beforeEach(function() {
			out = sizlate.doRender('<div></div>', {'div': 'hi'});
		});

		it("should set the innerHTML", function() {
			expect(out).toEqual('<div>hi</div>');
		});
	});









	describe('When given a id selector ', function() {
		it("it should set the innerHTML", function() {		
			var out = sizlate.doRender('<div id="one"></div>', {'#one': 'hi'});
			var expected = '<div id="one">hi</div>';
			expect(out).toEqual(expected);
		});
	});

	describe('When given a id selector ', function() {
		it("it should set the innerHTML", function() {
			var out = sizlate.doRender('<div class="one"></div>', {'.one': 'hi'});
			var expected = '<div class="one">hi</div>';
			expect(out).toEqual(expected);
		});
	});

	describe('When given an object ', function() {
		it("it should set the appropriate attributes", function() {
			var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'data-thing': 'bobby'}});
			var expected = '<div class="one" data-thing="bobby"></div>';
			expect(out).toEqual(expected);
		});
	});

	describe('When given an object with more than one attribute', function() {
		it("it should set the appropriate attributes", function() {
			var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'data-thing': 'bobby', 'data-foobar': 'beepboop'}});
			var expected = '<div class="one" data-thing="bobby" data-foobar="beepboop"></div>';
			expect(out).toEqual(expected);
		});
	});

	describe('When given an object containing innerHTML ', function() {
		it("it should set the innerHTML", function() {
			var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'innerHTML': 'bobby'}});
			var expected = '<div class="one">bobby</div>';
			expect(out).toEqual(expected);
		});
	});

	describe('When given an object containing className ', function() {
		it("it should set the class but not remove existing classes.", function() {
			var out = sizlate.doRender('<div class="one"></div>', {'.one': { 'className': 'bobby'}});
			var expected = '<div class="one bobby"></div>';
			expect(out).toEqual(expected);
		});
	});

	describe('Given an input with an id ', function() {
		var htmlInput = '<input id="typo"></input>';
		var expected = '<input id="typo" value="newValue">';

		describe('When doRender is called with a selector of the same id and a value ', function() {
			var selectors = {'#typo': 'newValue'};

			it("it should set the value attribute..", function() {
				var out = sizlate.doRender(htmlInput, selectors);
				expect(out).toEqual(expected);
			});
		});
	});
});
