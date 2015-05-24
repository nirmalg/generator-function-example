var q = require('q');
var galaxy = require('galaxy');

/**
 * typical callback
 * @param msg
 * @param cb
 */
function cb1(msg, cb){
  setTimeout(function () {
    cb(undefined, msg + '-p1');
  }, 1000)
}

/**
 * starify typical callback function.
 */
var cbs = galaxy.star(cb1);

/**
 * this generator function uses typical starred method cbs.
 * @param msg
 * @returns {*}
 */
function* f1(msg) {
  if (msg != null)
    return yield* cbs(msg + '-f1');

  return yield "xxxx";
}

/**
 * generator function using another generator function.
 * @param msg
 * @returns {*}
 */
function* f2(msg) {
  return yield* f1(msg + '-f2')
}

/**
 * running generator function using galaxy.main.
 * Please note, if you want to return anything from this function, use promise or callback.
 */
function test(msg) {
  galaxy.main(function* () {
    var a = yield* f1('test' + msg);
    console.log('a', a);
    var b = yield* f2(a);
    console.log('b', b)
  })
}

test('1');
test('2');
