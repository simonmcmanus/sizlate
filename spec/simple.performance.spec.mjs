import sizlate from  '../sizlate.js'

describe('When given tag selector ', function () {
  it('it should set the innerHTML', function () {
    var startTime = new Date().getTime()
    var i = 1000
    while (--i > 0) {
      sizlate.render('<div></div>', { 'div': 'hi' })
    }
    expect(new Date().getTime() - startTime).toBeLessThan(500)
  })
})

describe('When given a id selector ', function () {
  it('it should set the innerHTML', function () {
    var startTime = new Date().getTime()
    var i = 1000
    while (--i > 0) {
      sizlate.render('<div id="one"></div>', { '#one': 'hi' })
    }
    expect(new Date().getTime() - startTime).toBeLessThan(500)
  })
})

describe('When given an object ', function () {
  it('it should set the appropriate attributes in less than 400ms', function () {
    var startTime = new Date().getTime()
    var i = 1000
    while (--i > 0) {
      sizlate.render('<div class="one"></div>', { '.one': { 'data-thing': 'bobby' } })
    }
    expect(new Date().getTime() - startTime).toBeLessThan(400)
  })
})

describe('When given an object with more than one attribute', function () {
  it('it should set the appropriate attributes in less than 400ms', function () {
    var startTime = new Date().getTime()
    var i = 1000
    while (--i > 0) {
      sizlate.render('<div class="one"></div>', { '.one': { 'data-thing': 'bobby', 'data-foobar': 'beepboop' } })
    }
    expect(new Date().getTime() - startTime).toBeLessThan(400)
  })
})

describe('When given an object containing innerHTML ', function () {
  it('it should set the innerHTML  in less that 400ms', function () {
    var startTime = new Date().getTime()
    var i = 1000
    while (--i > 0) {
      sizlate.render('<div class="one"></div>', { '.one': { 'innerHTML': 'bobby' } })
    }
    expect(new Date().getTime() - startTime).toBeLessThan(500)
  })
})

describe('When given an object containing className ', function () {
  it('it should set the class but not remove existing classes  in less than 400ms', function () {
    var startTime = new Date().getTime()
    var i = 1000
    while (--i > 0) {
      sizlate.render('<div class="one"></div>', { '.one': { 'className': 'bobby' } })
    }
    expect(new Date().getTime() - startTime).toBeLessThan(400)
  })
})
