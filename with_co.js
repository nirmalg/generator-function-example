var q  = require('q');
var co = require('co');
function* Exchange() {
  console.log('created');
  this.users = {};
  this.ready = false;
  yield* this.spin();
}

Exchange.prototype.spin = function* () {
  console.log('spin');
  var self = this;
  setInterval(self.match.bind(this), 1000)
};

Exchange.prototype.match = co.wrap(function*(){
  console.log('match');
  console.log(yield this.p1());
});

var counter = 0;
Exchange.prototype.p1 = function () {
console.log('p1')  
  var deferred = q.defer();
  setTimeout(function () {
    console.log('settimeout')
    deferred.resolve(counter++);
  }, 10);
  return deferred.promise;
};

var main = co.wrap(function* () {
  var exchange = yield* new Exchange();

});
main();
