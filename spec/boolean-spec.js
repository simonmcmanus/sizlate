if(typeof require != 'undefined') {
    var sizlate = require('../sizlate.js');
}

describe('When a false value', function() {
    it("it should remove the node", function() {
        var html = '<div><h1></h1></div>';
        var selectors = {
            'h1': false
        };

        var out = sizlate.render(html, selectors);
        var expected = '<div></div>';
        expect(out).toEqual(expected);
     });
});


describe('When a false array', function() {
    it("it should remove the parent", function() {
        var html = '<div><ul><li></li></ul></div>';
        var selectors = {
            'li': [ false ]
        };

        var out = sizlate.render(html, selectors);
        var expected = '<div></div>';
        expect(out).toEqual(expected);
     });
});

