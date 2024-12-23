function hasPairSum(nums: number[], target: number) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return true;
      }
    }
  }
  return false;
}

export function part1(lines: string[], testMode) {
  const nums = lines.map(Number);
  const preambleLength = testMode ? 5 : 25;
  for (let i = preambleLength; i < lines.length; i++) {
    const num = nums[i];
    const previous = nums.slice(i - preambleLength, i);
    if (!hasPairSum(previous, num)) {
      return num;
    }
  }
  return 0;
}

export function part2(lines: string[], testMode) {
  const num = part1(lines, testMode);
  for (let i = 0; i < lines.length; i++) {
    let sum = 0;
    let min = Infinity;
    let max = -Infinity;
    for (let j = i; j < lines.length; j++) {
      const n = Number(lines[j]);
      sum += n;
      min = Math.min(min, n);
      max = Math.max(max, n);
      if (sum === num) {
        return min + max;
      }
      if (sum > num) {
        break;
      }
    }
  }
  return 0;
}
