var sizlate = require('../sizlate.js');

xdescribe('When simple express called ', function() {
	it("simple express.", function(done) {
		sizlate.__express('', {
			layout: 'layout',
			settings: {
				views: '/asda/'
			},
			selectors: {
				a: 'hi a'
			}
		}, function() {
			console.log(arguments);
		});


		var expected = '<div id="one"><a href="sd">wotcha</a></div>';
		//expect(out).toEqual(expected);
		done();
	 });
});