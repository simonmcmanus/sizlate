
var serverside = (typeof require !== 'undefined');
// these will only work serverside as the clientside stuff does not include the html tag.
if(serverside) {
	var sizlate = require('../sizlate.js');

	describe('When __express is called with layout:false ', function() {

		beforeEach(function() {

			var htmlOut = '<div><span></span><span id="insertHere"></span></div>';
			if(serverside) {
				// not strictly necessary (as could use fs.readfile) but keeps things DRY
				spyOn(sizlate.variations.serverside, 'get').andCallFake(function(url, callback) {
					callback(null, htmlOut);
				});
			} else {
				// override $.get to avoid network requests.
				spyOn(sizlate.variations.clientside, 'get').andCallFake(function(url, callback) {
					callback(null, htmlOut);
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
				var expected = '<div><span></span><span id="insertHere">hello there</span></div>';
				expect(markup.replace(/\n/g, '')).toEqual(expected);

			});
		 });
	});


	// this is a damn good test but is failing due to a bug clientside.
	describe('When __express is called with a layout specified  ', function() {

		beforeEach(function() {

			// returns the requested file html
			var picker = function(url) {
				var out;
				switch(url) {
					case '/spec/views/layout.sizlate':
						out = '<html><head></head><body><div id="container"></div></body></html>';
					break;
					case '/spec/views/heading.sizlate':
						out = '<div><span></span><span id="insertHere"></span></div>';
					break;
				}
				return out;
			};

			if(serverside) {
				// not strictly necessary (as could use fs.readfile) but keeps things DRY
				spyOn(sizlate.variations.serverside, 'get').andCallFake(function(url, callback) {
					callback(null, picker(url));
				});
			} else {
				// override $.get to avoid network requests.
				spyOn(sizlate.variations.clientside, 'get').andCallFake(function(url, callback) {
					callback(null, picker(url));
				});
			}
		});


		it("is should render the header view.", function() {
			sizlate.__express('heading', {
				layout: 'layout',
				settings: {
					views: '/spec/views'
				},
				selectors: {
					'#insertHere': 'hello there'
				}
			}, function(error, markup) {
				var expected = '<html><head></head><body><div id="container"><div><span></span><span id="insertHere">hello there</span></div></div></body></html>';
				expect(markup.replace(/\n/g, '')).toEqual(expected);
			});
		 });
	});


	describe('When __express is called with a partial..', function() {


		it("is should render the header view.", function() {
			sizlate.__express('heading', {
				layout: false,
				settings: {
					views: '/spec/views'
				},
				selectors: {
					'ul': {
						partial: 'partial',
						data: [
							{'.name': 'bob1'},
							{'.name': 'bob2'},
							{'.name': 'bob3'}
						]
					}
				}
			}, function(error, markup) {
				console.log(markup)
				//expect(markup.replace(/\n/g, '')).toEqual('');
			})
		})

	});
}



// should default to #contaier
//
// // check top level and nested items.

// describe('When passed a settings.views path all files views should be requested from the specified folder.', function() {});
