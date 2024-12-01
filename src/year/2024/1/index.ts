function getData(
  lines: string[],
): [number[], number[], Record<number, number>] {
  let firstNums = [],
    secondNums = [];
  const secondListCounts = {};

  lines.forEach((curr) => {
    const [first, second] = curr.split(/\s+/).map(Number);
    firstNums.push(first);
    secondNums.push(second);
    if (secondListCounts[second]) {
      secondListCounts[second]++;
    } else {
      secondListCounts[second] = 1;
    }
  }, 0);
  firstNums = firstNums.sort();
  secondNums = secondNums.sort();
  return [firstNums, secondNums, secondListCounts];
}

export function part1(lines: string[]): number {
  const [firsts, seconds] = getData(lines);
  return firsts.reduce((acc, curr, i) => {
    return acc + Math.abs(curr - seconds[i]);
  }, 0);
}

export function part2(lines: string[]): number {
  const [firsts, seconds, secondCounts] = getData(lines);
  return firsts.reduce((acc, curr) => {
    return acc + (curr * secondCounts[curr] || 0);
  }, 0);
}
