'use strict';

var bluebird = require('bluebird');
var util = require('util');
var assert = require('assert');

/**
 * typical callback
 */
function calculatorCB(input, outputCallback) {
  util.log('calP', input);
  setTimeout(function () {
    util.log('calP done', input);
    outputCallback(undefined, input * 10);
  }, 1000)
}

/**
 * promisify typical callback function.
 */
var calP = bluebird.promisify(calculatorCB);

function* calc(input) {
  return (yield calP(input))
}

var test = bluebird.coroutine(function* () {
  var result1  = yield [calP(1), calP(2)];
  //var result1  = yield* runParallel(calc.bind(undefined,1), calc.bind(undefined,2));
  util.log(result1);
});

function* runParallel(){
  var promises = [];
  for(var i = 0; i < arguments.length; i++){
    promises.push(bluebird.coroutine(arguments[i])())
  }
  return yield bluebird.all(promises);
}

test();

