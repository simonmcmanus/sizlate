import sizlate from  '../sizlate.js'

describe('When given a nested selector ', function () {
  it('it should render the nested selector.', function () {
    var markup = '<div id="one"><a href="sd"></a></div>'
    var selectors = {
      '#one': {
        selectors: {
          a: 'wotcha'
        }
      }
    }

    var out = sizlate.render(markup, selectors)
    var expected = '<div id="one"><a href="sd">wotcha</a></div>'
    expect(out).toEqual(expected)
  })
})
