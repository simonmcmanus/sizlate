var sizlate = require('../sizlate.js')
	assert = require('assert');

describe('When given a regex', function() {
	it("it should allow simple replacing", function(done) {
		var out = sizlate.doRender('<div class="one">existing value</div><div class="one">existing something</div>', {
			'.one': {
				'innerText' : {
					regex : /existing ([a-z]+)/ig,
					value : "new $1"
				}
			}
		});
		var expected = '<div class="one">new value</div><div class="one">new something</div>';
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


describe('When given a function', function() {
	it("it should allow anything you like", function(done) {
		var out = sizlate.doRender('<div class="one">value A</div><div class="one">value B</div>', {
			'.one': {
				'innerText' : function( text ){ return text.replace(/value/ig,"amaze"); }
			}
		});
		var expected = '<div class="one">amaze A</div><div class="one">amaze B</div>';
		expect(out).toEqual(expected);
		done();
	});
});