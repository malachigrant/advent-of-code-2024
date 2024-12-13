import {
  average,
  getIntersection,
  getLoopingNum,
  getNumDigits,
  getNumLeft,
  getNumRight,
  numberConcat,
} from '../NumberUtil';

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

  it.each([
    [9, 1],
    [10, 2],
    [500, 3],
  ])('getNumDigits', (num, expected) => {
    expect(getNumDigits(num)).toBe(expected);
  });

  it.each([
    [9, 1, 9],
    [10, 1, 1],
    [500, 2, 50],
    [1020, 3, 102],
  ])('getNumLeft', (num, count, expected) => {
    expect(getNumLeft(num, count)).toBe(expected);
  });

  it.each([
    [9, 1, 9],
    [10, 1, 0],
    [500, 2, 0],
    [1020, 3, 20],
  ])('getNumRight', (num, count, expected) => {
    expect(getNumRight(num, count)).toBe(expected);
  });

  it('intersection', () => {
    const [x, y] = getIntersection(1, 1, 4, 2, 1, 3);
    expect(x).toBe(-1);
    expect(y).toBe(5);
  });
});
