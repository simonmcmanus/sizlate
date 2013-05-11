var sizlate = require('../sizlate.js');



describe('When given a nested selector ', function() {
	it("it should render the nested selector.", function(done) {
		var out = sizlate.doRender('<div id="one"><a href="sd"></a></div>', {'#one': { selectors: { a: 'wotcha'} }});
		var expected = '<div id="one"><a href="sd">wotcha</a></div>';
		expect(out).toEqual(expected);
		done();
	 });
});