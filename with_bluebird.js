var Promise = require("bluebird");

/**
 * typical callback
 */
function cb1(msg, cb) {
  setTimeout(function () {
    cb(undefined, msg + '-p1');
  }, 1000)
}

/**
 * promisify typical callback function.
 */
var cbp = Promise.promisify(cb1);

/**
 * first generator function using promise function
 */
function* f1(msg) {
  if (msg != null)
    return yield cbp(msg + '-f1');

  return yield "xxxx";
}

/**
 * generator function using another generator function
 */
function* f2(msg) {
  return yield* f1(msg + '-f2')
}

/**
 * running generator function using bluebird's coroutine.
 * Please note, if you want to return anything from this function, use promise or callback.
 */
var test = Promise.coroutine(function* (msg) {
  var a = yield* f1('test' + msg);
  console.log('a', a);
  var b = yield* f2(a);
  console.log('b', b)

});

test('1');
test('2');
