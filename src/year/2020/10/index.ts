import { cache } from '../../../utils/CacheUtil';

export function part1(lines: string[]) {
  const sortedNums = lines.map(Number).sort((a, b) => a - b);
  let diffCounts = { 1: 0, 3: 1 };
  let currentJoltage = 0;
  sortedNums.forEach((num) => {
    const diff = num - currentJoltage;
    diffCounts[diff]++;
    currentJoltage = num;
  });
  return diffCounts[1] * diffCounts[3];
}

const countArrangements = cache(
  (sortedNums: number[]) => {
    if (sortedNums.length === 1) {
      return 1;
    }
    let count = 0;
    for (let i = 1; i < sortedNums.length; i++) {
      if (sortedNums[i] - sortedNums[0] <= 3) {
        count += countArrangements(sortedNums.slice(i));
      }
    }
    return count;
  },
  (sortedNums: number[]) => sortedNums.length.toString(),
);

export function part2(lines: string[]) {
  const sortedNums = lines.map(Number).sort((a, b) => a - b);
  return countArrangements([0, ...sortedNums]);
}
