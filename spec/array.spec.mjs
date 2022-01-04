import sizlate from  '../sizlate.js'


describe('When given an array with an object', function () {
  it('it should render the list', function () {
    var html = '<ul><li></li></ul>'
    var selectors = {
      'li': [
        {
          'href': 'df',
          innerHTML: 'aaa'
        },
        'change links to this',
        'change links to this2'
      ]
    }

    var out = sizlate.render(html, selectors)
    var expected = '<ul><li href="df">aaa</li><li>change links to this</li><li>change links to this2</li></ul>'
    expect(out).toEqual(expected)
  })
})

describe('When given an array ', function () {
  it('it should render the list', function () {
    var html = '<ul><li></li></ul>'
    var selectors = {
      'li': [
        'change links to this',
        'change links to this2'
      ]
    }

    var out = sizlate.render(html, selectors)
    var expected = '<ul><li>change links to this</li><li>change links to this2</li></ul>'
    expect(out).toEqual(expected)
  })
})
