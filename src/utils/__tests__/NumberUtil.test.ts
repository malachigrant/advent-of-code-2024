import { average, getLoopingNum, numberConcat } from '../NumberUtil';

describe('NumberUtil', () => {
  it.each([
    [1, 1, 11],
    [12, 34, 1234],
    [1, 500, 1500],
    [12345, 6, 123456],
  ])(
    'concatNumber concatenates two numbers together',
    (first, second, expected) => {
      expect(numberConcat(first, second)).toBe(expected);
    },
  );

  it.each([
    [[0, 10], 5],
    [[6], 6],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9], 5],
    [[-5, 5], 0],
  ])('average gets the average of a list of numbers', (nums, expected) => {
    expect(average(nums)).toBe(expected);
  });

  it.each([
    [5, 0, 1, 0],
    [5, 1, 2, 1],
    [5, 4, 10, 5],
    [10, 0, 5, 0],
    [1, 2, 5, 4],
    [-5, 1, 4, 1],
  ])('getLoopingNum gets correct number', (num, min, max, expected) => {
    expect(getLoopingNum(num, min, max)).toBe(expected);
  });
});
