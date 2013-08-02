
var serverside = (typeof require !== 'undefined');


if(serverside) { 

	
	var sizlate = require('../sizlate.js');
	console.log('RUNNING SERVERSIDE', sizlate);
}

describe('When __express is called with layout:false ', function() {

	beforeEach(function() {

		var htmlOut = '<div><span></span><span id="insertHere"></span></div>';
		// override $.get to avoid network requests.
		// 
		// 
		if(serverside) {
			spyOn(sizlate.variations.serverside, 'get').andCallFake(function(url, callback) {
				callback(null, htmlOut);
			});
		} else {
			spyOn($, 'get').andCallFake(function(url, callback) {
				callback(htmlOut);
			});			
		}

	});


	it("is should render the header view.", function() {
		sizlate.__express('heading', {
			layout: false,
			settings: {
				views: '/spec/views'
			},
			selectors: {
				'#insertHere': 'hello there'
			}
		}, function(error, markup) {
			console.log(error, markup);
			var expected = '<div><span></span><span id="insertHere">hello there</span></div>';
			expect(markup.replace(/\n/g, '')).toEqual(expected);

		});
	 });
});


xdescribe('When __express is called with a layout specified', function() {
	it("is should render the header view within the specified layout.", function(done) {
		sizlate.__express('heading', {
			layout: 'layout',
			container: '#container',
			settings: {
				views: '/spec/views'
			},
			selectors: {
				'h1': 'hello there'
			}
		}, function(error, markup) {
			console.log('markup', markup);
			var expected = '<html><head>	<title>Wooooo</title></head><body>	<div id="container"><h1>hello there</h1></div></body></html>';
			expect(markup.replace(/\n/g, '')).toEqual(expected);
			done();
		});
	});
});


describe('When passed a settings.views path all files views should be requested from the specified folder.', function() {});