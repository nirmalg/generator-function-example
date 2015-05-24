var q = require('q');

/**
 * promise function using q
 */
function p1(msg) {
  var deferred = q.defer();
  setTimeout(function () {
    deferred.resolve(msg + '-p1');
  }, 1000);
  return deferred.promise;
}

/**
 * first generator function using promise function
 */
function* f1(msg) {
  if (msg != null)
    return yield p1(msg + '-f1');

  return yield "xxxx";
}

/**
 * generator function using another generator function
 */
function* f2(msg) {
  return yield* f1(msg + '-f2')
}

/**
 * running generator function using q.spawn.
 * Please note, if you want to return anything from this function, use promise or callback.
 */
function test(msg) {
  q.spawn(function* () {
    var a = yield* f1('test' + msg);
    console.log('a', a);
    var b = yield* f2(a);
    console.log('b', b)

  })
}

test('1');
test('2');
