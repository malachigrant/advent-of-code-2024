function parse(lines: string[]): [number[][], number[][]] {
  const [rules, pageOrders] = lines
    .join('\n')
    .split('\n\n')
    .map((line) => line.split('\n'));
  return [
    rules.map((rule) => rule.split('|').map(Number)),
    pageOrders.map((order) => order.split(',').map(Number)),
  ];
}

function findErrorIndexes(rules: number[][], nums: number[]) {
  let index1, index2;
  rules.findIndex(([l, r]) => {
    const i1 = nums.findIndex((val) => val === l);
    const i2 = nums.findIndex((val) => val === r);
    if (i1 > -1 && i2 > -1 && i1 > i2) {
      index1 = i1;
      index2 = i2;
      return true;
    }
  });
  return [index1, index2];
}

function getMiddle(a: number[]) {
  return a[Math.floor(a.length / 2)];
}

export function part1(lines: string[]) {
  const [rules, pageOrders] = parse(lines);
  const properOrders = pageOrders.filter((order) => {
    const [i] = findErrorIndexes(rules, order);
    if (i > -1) {
      return false;
    }
    return true;
  });
  return properOrders.reduce((acc, curr) => {
    return acc + getMiddle(curr);
  }, 0);
}

function swap(nums: number[], i1, i2) {
  const tmp = nums[i1];
  nums[i1] = nums[i2];
  nums[i2] = tmp;
}

function bubbleFix(rules: number[][], nums: number[]) {
  let swapsDone = 0;
  do {
    swapsDone = 0;
    rules.forEach(([l, r]) => {
      const i1 = nums.findIndex((val) => val === l);
      const i2 = nums.findIndex((val) => val === r);
      if (i1 > -1 && i2 > -1 && i1 > i2) {
        swap(nums, i1, i2);
        swapsDone++;
      }
    });
  } while (swapsDone > 0);
  return nums;
}

export function part2(lines: string[]) {
  const [rules, pageOrders] = parse(lines);
  const incorrectOrders = pageOrders.filter((order) => {
    const [i] = findErrorIndexes(rules, order);
    if (i > -1) {
      return true;
    }
    return false;
  });

  const fixed = incorrectOrders.map((order) => {
    return bubbleFix(rules, order);
  });
  return fixed.reduce((acc, curr) => {
    return acc + getMiddle(curr);
  }, 0);
}
