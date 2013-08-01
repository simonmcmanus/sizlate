if(typeof require != 'undefined') { 
	var sizlate = require('../sizlate.js');
}

describe('When __express is called with layout:false ', function() {
	it("is should render the header view.", function(done) {
		sizlate.__express(__dirname+'/views/heading.sizlate', {
			layout: false,
			settings: {
				views: __dirname + '..//'
			},
			selectors: {
				'h1': 'hello there'
			}
		}, function(error, markup) {
			var expected = '<h1>hello there</h1>';
			expect(markup.replace(/\n/g, '')).toEqual(expected);
			done();
		});
	 });
});


describe('When __express is called with a layout specified', function() {
	it("is should render the header view within the specified layout.", function(done) {
		sizlate.__express(__dirname+'/views/heading.sizlate', {
			layout: 'layout',
			container: '#container',
			settings: {
				views: __dirname + '/views'
			},
			selectors: {
				'h1': 'hello there'
			}
		}, function(error, markup) {
			var expected = '<html><head>	<title>Wooooo</title></head><body>	<div id="container"><h1>hello there</h1></div></body></html>';
			expect(markup.replace(/\n/g, '')).toEqual(expected);
			done();
		});
		
	 });
});


describe('When passed a settings.views path all files views should be requested from the specified folder.', function() {});