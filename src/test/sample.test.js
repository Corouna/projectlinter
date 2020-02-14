/* This is a sample unit test file for testing Test.js inside Util folder */

import { SumThis, SubtractThis, MultiplyThis, DivideThis } from './../utils/Test';

/* Testing SumThis */
test('Adds 1 + 2 to equal 3', () => {
  expect(SumThis(1, 2)).toBe(3);
});

/* Testing SubtractThis */
test('Subtract 2 - 1 to equal 1', () => {
  expect(SubtractThis(2, 1)).toBe(1);
});

/* Testing MultiplyThis */
test('Multiply 1 x 2 to equal 2', () => {
  expect(MultiplyThis(1, 2)).toBe(2);
});

/* Testing DivideThis */
test('Divide 2 / 1 to equal 2', () => {
  expect(DivideThis(2, 1)).toBe(2);
});