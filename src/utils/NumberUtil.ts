export function numberConcat(num1: number, num2: number) {
  const magnitude = Math.floor(Math.log10(num2));
  return num1 * Math.pow(10, magnitude + 1) + num2;
}

export function average(nums: number[]): number {
  return nums.reduce((acc, curr) => acc + curr, 0) / nums.length;
}

/** Gets the normalized number between min and max (excluding max) */
export function getLoopingNum(num: number, min: number, max: number): number {
  const normalizedNum = num - min;
  const normalizedMax = max - min;
  const modResult = normalizedNum % normalizedMax;
  return modResult < 0 ? modResult + normalizedMax + min : modResult + min;
}

/**
 * Gets the count of digits in a number.
 * Must be a positive number > 0
 */
export function getNumDigits(num: number): number {
  if (num <= 0)
    throw new Error(
      `getNumDigits: num must be a positive number. Received ${num}`,
    );
  return Math.floor(Math.log10(num) + 1);
}

/**
 * Gets a new number from the left side of the digits in a number
 * @param num
 * @param digitCount the number of digits we want to get from the left side of the number
 * @returns
 */
export function getNumLeft(num: number, digitCount: number) {
  const digits = getNumDigits(num);
  if (digitCount >= digits) return num;
  return Math.floor(num / Math.pow(10, digits - digitCount));
}

/**
 * Gets a new number from the right side of the digits in a number
 * @param num
 * @param digitCount the number of digits we want to get from the right side of the number
 * @returns
 */
export function getNumRight(num: number, digitCount: number) {
  return num % Math.pow(10, digitCount);
}
