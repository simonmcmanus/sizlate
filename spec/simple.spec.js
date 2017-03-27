if(typeof require != 'undefined') {
	sizlate = require('../sizlate.js');
}


describe('Given calling render', function() {
	var out;

	describe('When called with a tag selector (div) and a string value', function() {
		beforeEach(function() {
			out = sizlate.render('<div></div>', {'div': 'hi'});
		});

		it("should set the div innerHTML to the string value", function() {
			expect(out).toEqual('<div>hi</div>');
		});
	});

	describe('When given a id selector ', function() {
		it("it should set the innerHTML", function() {
			var out = sizlate.render('<div id="one"></div>', {'#one': 'hi'});
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

				describe('When render is called with the selectors ', function() {
					it('Should set the innerHTML of div to "hi"', function() {
						out = sizlate.render(htmlIn, selectors);
						expect(out).toEqual('<div class="one">hi</div>');
					});
				});

			});



			describe('Given a an object', function() {

				describe('... containing a innerHTML property', function() {
					beforeEach(function() {
						selectors[selector] = { innerHTML: 'booo'};
					});

					describe('When render is called with the selectors ', function() {
						it('Should set the innerHTML of div', function() {
							out = sizlate.render(htmlIn, selectors);
							expect(out).toEqual('<div class="one">booo</div>');
						});
					});

					describe('... and a className property', function() {
						beforeEach(function() {
							selectors[selector].className = 'booo';
						});

						describe('When render is called with the selectors ', function() {
							it('Should set the innerHTML of div', function() {
								out = sizlate.render(htmlIn, selectors);
								expect(out).toEqual('<div class="one booo">booo</div>');
							});
						});

					});

				});

				describe(' containing a className property', function() {

					beforeEach(function() {
						selectors[selector] = { className: 'booot'};
					});

					describe('When render is called with the selectors ', function() {
						it('Should set the className of the div but not remove the existing class', function() {
							out = sizlate.render(htmlIn, selectors);
							expect(out).toEqual('<div class="one booot"></div>');
						});
					});
				});

				describe('containing a data-* property', function() {

					beforeEach(function() {
						selectors[selector] = { 'data-thing': 'booot'};
					});

					describe('When render is called with the selectors ', function() {
						it('Should set the className of the div but not remove the existing class', function() {
							out = sizlate.render(htmlIn, selectors);
							expect(out).toEqual('<div class="one" data-thing="booot"></div>');
						});
					});
				});
			});
		});
	});

	describe('Given an input with an id ', function() {
		var htmlDiv = '<div id="typo">eeeeeeegs</div>';
		var expected = '<div id="typo">newValue</div>';

		describe('When render is called with a selector of the same id and a value ', function() {
			var selectors = {'#typo': 'newValue'};

			it("it should set the value", function() {
				var out = sizlate.render(htmlDiv, selectors);
				expect(out).toEqual(expected);
			});
		});
	});

    describe('Given a div', function() {
		var htmlDiv = '<div class="typo">Hi</div>';

		describe('When render is called with a selector with data null ', function() {
			var selectors = {'.typo': null};

			it("it should not change the html", function() {
				var out = sizlate.render(htmlDiv, selectors);
				expect(out).toEqual(htmlDiv);
			});
		});
	});

	describe('Given an input with an id ', function() {
		var htmlDiv = '<div id="typo"></div>';
		var expected = '<div id="typo" data-bacon="true"></div>';

		describe('When render is called with a selector of the same id and a value ', function() {
			var selectors = {'#typo': {
                'data-bacon': true
            }};

			it("it should set the value", function() {
				var out = sizlate.render(htmlDiv, selectors);
				expect(out).toEqual(expected);
			});
		});
	});

});

describe('When given a value to edit', function() {
	it("it should perform the expected transformation", function() {
		var out = sizlate.render('<div class="one"></div>', {'.one': { 'className': 'bobby'}});
		var expected = '<div class="one bobby"></div>';
		expect(out).toEqual(expected);
	});
});

describe('When given a text value', function() {
	it("it should escape HTML values", function() {
		// // var out = sizlate.render('<div class="one"></div>', {'.one': { 'innerHTML': 'Well this is a little <b>awkward</b>'}});
		// // var expected = '<div class="one">Well this is a little &lt;b&gt;awkward&lt;/b&gt;</div>';
		// expect(expected).toEqual(out);
	});
});
