import sizlate from  '../sizlate.js'
  
  describe('Given calling render', function () {
    var out
  
    describe('When called with an input', function () {
      beforeEach(function () {
        out = sizlate.render('<input/>', { 'input': 'hi' })
      })
  
      it('should set the div innerHTML to the string value', function () {
        expect(out).toEqual('<input value="hi">')
      })
    })
})
  