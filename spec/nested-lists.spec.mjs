import sizlate from '../sizlate.js'

var pretty = require('pretty');

beforeEach(function() {
    jasmine.addMatchers(require('jasmine-diff')(jasmine, {
        // Specify options here
        inline: true,
        colors: true
    }))
})

describe('When given a nested selector ', function() {
    it('it should render the nested selector.', function() {
        var markup = '<ul ><li class="item"><a href="sd"></a><span></span></li></ul>'
        var selectors = {
            '.item': [{
                    selectors: {
                        // a: {
                        //     href: 'boo.com/0',
                        //     innerHTML: 'boo.com/0'

                        // },
                        span: 'hi0'
                    }

                },
                {
                    selectors: {
                        // a: {
                        //     href: 'boo.com/1',
                        //     innerHTML: 'boo.com/1'

                        // },
                        span: 'hi1'
                    }

                }
            ]

        }

        var out = sizlate.render(markup, selectors)
        var expected = `<ul><li class="item"><a href="sd"></a><span>hi0</span></li><li class="item"><a href="sd"></a><span>hi1</span></li></ul>`
        expect(pretty(out)).toEqual(pretty(expected))
    })
})