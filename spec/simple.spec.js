if(typeof require != 'undefined') {
	sizlate = require('../sizlate.js');
}

describe('Given calling doRender', function() {
	var out;

	describe('When called with a tag selector (div) and a string value', function() {
		beforeEach(function() {
			out = sizlate.doRender('<div></div>', {'div': 'hi'});
		});

		it("should set the div innerHTML to the string value", function() {
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

	describe('Given html with a class ', function() {
		var htmlIn = '<div class="one"></div>';
		describe('given a class selector', function() {

			var selector = '.one';
			var selectors = {};
			var out;

			describe('Given a string value of "hi" ', function() {

				beforeEach(function() {
					selectors[selector] = 'hi';
				});

				describe('When doRender is called with the selectors ', function() {
					it('Should set the innerHTML of div to "hi"', function() {
						out = sizlate.doRender(htmlIn, selectors);
						expect(out).toEqual('<div class="one">hi</div>');
					});
				});

			});



			describe('Given a an object', function() {

				describe('... containing a innerHTML property', function() {
					beforeEach(function() {
						selectors[selector] = { innerHTML: 'booo'};
					});

					describe('When doRender is called with the selectors ', function() {
						it('Should set the innerHTML of div', function() {
							out = sizlate.doRender(htmlIn, selectors);
							expect(out).toEqual('<div class="one">booo</div>');
						});
					});

					describe('... and a className property', function() {
						beforeEach(function() {
							selectors[selector].className = 'booo';
						});

						describe('When doRender is called with the selectors ', function() {
							it('Should set the innerHTML of div', function() {
								out = sizlate.doRender(htmlIn, selectors);
								expect(out).toEqual('<div class="one booo">booo</div>');
							});
						});

					});

				});

				describe(' containing a className property', function() {

					beforeEach(function() {
						selectors[selector] = { className: 'booot'};
					});

					describe('When doRender is called with the selectors ', function() {
						it('Should set the className of the div but not remove the existing class', function() {
							out = sizlate.doRender(htmlIn, selectors);
							expect(out).toEqual('<div class="one booot"></div>');
						});
					});
				});

				describe('containing a data-* property', function() {

					beforeEach(function() {
						selectors[selector] = { 'data-thing': 'booot'};
					});

					describe('When doRender is called with the selectors ', function() {
						it('Should set the className of the div but not remove the existing class', function() {
							out = sizlate.doRender(htmlIn, selectors);
							expect(out).toEqual('<div class="one" data-thing="booot"></div>');
						});
					});
				});
			});
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
