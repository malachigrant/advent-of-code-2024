function isSafe(nums: number[]) {
  let safe = true;
  for (let i = 1; i < nums.length; i++) {
    const last = nums[i - 1];
    const curr = nums[i];
    if (curr <= last || curr > last + 3) {
      safe = false;
      break;
    }
  }
  if (safe) return true;
  safe = true;
  for (let i = 1; i < nums.length; i++) {
    const last = nums[i - 1];
    const curr = nums[i];
    if (curr >= last || curr < last - 3) {
      return false;
    }
  }
  return true;
}

export function part1(lines: string[]) {
  let safeCount = 0;
  lines.forEach((line) => {
    const nums = line.split(/\s+/).map(Number);
    if (isSafe(nums)) safeCount++;
  });
  return safeCount;
}

export function part2(lines: string[]) {
  let safeCount = 0;
  lines.forEach((line) => {
    const originalNums = line.split(/\s+/).map(Number);
    for (let i = 0; i < originalNums.length; i++) {
      const nums = [...originalNums];
      nums.splice(i, 1);
      if (isSafe(nums)) {
        safeCount++;
        return;
      }
    }
  });
  return safeCount;
}
