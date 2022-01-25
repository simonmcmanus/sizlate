import sizlate from '../sizlate.js'


describe('When given a nested selector ', function() {
    it('it should render the nested selector.', function() {
        var markup = '<ul><li class="item"><a href="sd"></a><span></span></li></ul>'
        var selectors = {
            '.item': [{
                    selectors: {
                        a: {
                            href: 'boo.com/0',
                            innerHTML: 'boo.com/0'
                        }
                    }
                },
                {
                    selectors: {
                        a: {
                            href: 'boo.com/1',
                            innerHTML: 'boo.com/1'
                        }
                    }
                }
            ]
        }

        var out = sizlate.render(markup, selectors)
        var expected = `<ul><li class="item"><a href="boo.com/0">boo.com/0</a><span></span></li><li class="item"><a href="boo.com/1">boo.com/1</a><span></span></li></ul>`
        expect(out).toEqual(expected)
    })
})




describe('Given a list updateItem with various updateItem types', () => {

    var selectors = {
        '#top': {
            selectors: {
                '.item': [
                    'simple-string',
                    {
                    selectors: {
                        a: {
                            href: 'boo.com/0',
                            innerHTML: 'boo.com/0'
                        }
                    }
                },
                {
                        a: {
                            href: 'boo.com/1',
                            innerHTML: 'boo.com/1'
                        }
                    }
                
            ]
    
            }

        }
    }
    var markup = '<div id="top"><ul><li class="item"><a href="sd"></a><span></span></li></ul></div>'


    describe('When render is called', () => {
        var out = sizlate.render(markup, selectors)

        const listItems = out.match(/<li(.*?)\/li>/g)
        console.log(listItems)
        
        it('should clone the list item for each update item', () => {
            expect(listItems.length).toEqual(3)
        })
        it('should set the innerHtml of a string update item', () => {
            expect(listItems[0]).toEqual('<li class="item">simple-string</li>')
        })
        it('should up', () => {
            var expected = `<div id="top"><ul><li class="item">simple-string</li><li class="item"><a href="boo.com/0">boo.com/0</a><span></span></li><li class="item" a="[object Object]"><a href="sd"></a><span></span></li></ul></div>`
            expect(out).toEqual(expected)
        })
    
    })
})