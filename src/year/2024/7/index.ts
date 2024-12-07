function getPossibleOperators(count = 1, allowConcat = false) {
  if (count === 1) {
    return allowConcat ? [['+'], ['*'], ['||']] : [['+'], ['*']];
  }
  const inner = getPossibleOperators(count - 1, allowConcat);
  const result = [];
  inner.forEach((opList) => {
    result.push(['+', ...opList]);
    result.push(['*', ...opList]);
    result.push(['||', ...opList]);
  });
  return result;
}

export function part1(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    const [totalStr, numsStr] = line.split(': ');
    const total = Number(totalStr);
    const nums = numsStr.split(' ').map(Number);
    const operatorList = getPossibleOperators(nums.length - 1);
    operatorList.find((opList) => {
      let current = nums[0];
      opList.find((op, i) => {
        if (op === '+') {
          current += nums[i + 1];
        } else {
          current *= nums[i + 1];
        }
        if (current > total) return true;
      });
      if (current === total) {
        sum += total;
        return true;
      }
    });
  });
  return sum;
}

export function part2(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    const [totalStr, numsStr] = line.split(': ');
    const total = Number(totalStr);
    const nums = numsStr.split(' ').map(Number);
    const operatorList = getPossibleOperators(nums.length - 1, true);
    operatorList.find((opList) => {
      let current = nums[0];
      opList.find((op, i) => {
        if (op === '+') {
          current += nums[i + 1];
        } else if (op === '*') {
          current *= nums[i + 1];
        } else {
          current = Number(current.toString() + nums[i + 1].toString());
        }
        if (current > total) return true;
      });
      if (current === total) {
        sum += total;
        return true;
      }
    });
  });
  return sum;
}
