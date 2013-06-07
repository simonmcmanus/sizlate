var testCase  = require('nodeunit').testCase,
	sizlate = require('../sizlate.js');


module.exports = testCase({
    link : testCase({
		simple:function(test) {
	        test.equal( sizlate.doRender('<a>boby</a>', { a : 'foo' }), "<a>foo</a>" );
	        test.done();
		},
		multiple:function(test){
	        test.equal( sizlate.doRender('<a>boby</a><a>joe</a>', { a : 'foo' }), "<a>foo</a><a>foo</a>" );
	        test.done();
		},
		byClass:function(test){
	        test.equal( sizlate.doRender('<a class="foo">boby</a><a>joe</a>', { 'a.foo' : 'bar' }), '<a class="foo">bar</a><a>joe</a>' );
	        test.done();
		},
		nestedSelector:function(test){
	        test.equal( sizlate.doRender('<div><a class="foo">FAIL</a></div>', { 'div a.foo' : 'PASS' }), '<div><a class="foo">PASS</a></div>' );
	        test.done();
		},
		byId:function(test){
	        test.equal( sizlate.doRender('<div><a id="foo">FAIL</a></div>', { 'div a#foo' : 'PASS' }), '<div><a id="foo">PASS</a></div>' );
	        test.done();
		}
    }),


    "TC 1": testCase({
        "TC 1.1": testCase({
            "Test 1.1.1": function(test) {
                test.ok(true);
                test.done();
            }
        })
    }),

    "TC 2": testCase({
        "TC 2.1": testCase({
            "TC 2.1.1": testCase({
                "Test 2.1.1.1": function(test) {
                    test.ok(true);
                    test.done();
                },

                "Test 2.1.1.2": function(test) {
                    test.ok(true);
                    test.done();
                }
            }),

            "TC 2.2.1": testCase({
                "Test 2.2.1.1": function(test) {
                    test.ok(true);
                    test.done();
                },

                "TC 2.2.1.1": testCase({
                    "Test 2.2.1.1.1": function(test) {
                        test.ok(true);
                        test.done();
                    },
                }),

                "Test 2.2.1.2": function(test) {
                    test.ok(true);
                    test.done();
                }
            })
        })
    })
});