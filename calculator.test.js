'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculateInterest } = require('./calculator');
test('calculates annual interest and total', () => {
  assert.deepEqual(calculateInterest(10000, 5, 3, 'years'), { principal: 10000, interest: 1500, total: 11500 });
});
test('converts months into years', () => {
  assert.equal(calculateInterest(10000, 6, 6, 'months').interest, 300);
});
test('supports zero interest and fractional durations', () => {
  assert.equal(calculateInterest(100, 0, 1, 'years').total, 100);
  assert.equal(calculateInterest(1000, 10, 1.5, 'years').interest, 150);
});
test('rejects invalid inputs and units', () => {
  for (const args of [[0,5,1,'years'],[-1,5,1,'years'],[100,-1,1,'years'],[100,5,0,'years'],[NaN,5,1,'years'],[Infinity,5,1,'years'],[100,5,1,'days'],[1e13,5,1,'years'],[100,1001,1,'years']]) assert.throws(() => calculateInterest(...args));
});
