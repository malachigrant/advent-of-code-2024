/**
 * Finds the midpoint value. If fn returns a number greater than 0, we check numbers smaller. If less than 0, we check numbers larger.
 * Basically, we just find the value at which fn returns 0, or the first one that returns greater than 0.
 * @param start start number
 * @param end end number
 * @param fn the function to run
 * @returns the number in the middle, or where fn returns 0
 */
export function binaryFind(
  start: number,
  end: number,
  fn: (num: number) => number,
): number {
  if (end === start) {
    return fn(start) <= 0 ? start : start - 1;
  }
  const mid = Math.floor((end + start) / 2);
  const result = fn(mid);
  if (result > 0) {
    return binaryFind(start, mid - 1, fn);
  } else if (result < 0) {
    return binaryFind(mid + 1, end, fn);
  } else {
    return start;
  }
}
