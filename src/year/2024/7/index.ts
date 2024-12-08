function canEqualTotal(
  nums: number[],
  total: number,
  allowConcat = false,
  current = nums[0],
  currentIndex = 0,
) {
  if (currentIndex === nums.length - 1) {
    return current === total;
  }
  if (current > total) return false;
  const nextNum = nums[currentIndex + 1];
  return (
    canEqualTotal(
      nums,
      total,
      allowConcat,
      current + nextNum,
      currentIndex + 1,
    ) ||
    canEqualTotal(
      nums,
      total,
      allowConcat,
      current * nextNum,
      currentIndex + 1,
    ) ||
    (allowConcat &&
      canEqualTotal(
        nums,
        total,
        allowConcat,
        Number(current.toString() + nextNum),
        currentIndex + 1,
      ))
  );
}

export function part1(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    const [totalStr, numsStr] = line.split(': ');
    const total = Number(totalStr);
    const nums = numsStr.split(' ').map(Number);
    if (canEqualTotal(nums, total)) sum += total;
  });
  return sum;
}

export function part2(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    const [totalStr, numsStr] = line.split(': ');
    const total = Number(totalStr);
    const nums = numsStr.split(' ').map(Number);
    if (canEqualTotal(nums, total, true)) sum += total;
  });
  return sum;
}
