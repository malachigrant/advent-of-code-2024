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
