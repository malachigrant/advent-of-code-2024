import { numberConcat } from '../NumberUtil';

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
});
