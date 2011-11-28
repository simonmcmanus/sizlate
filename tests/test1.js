require('should');
var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4)


var foo = 'a';

someAsyncTask(foo, function (err, result) {
    should.not.exist(err);
    should.exist(result);
    result.bar.should.equal(foo);
});