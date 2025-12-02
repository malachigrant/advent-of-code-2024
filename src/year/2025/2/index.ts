function isInvalid(num: Number) {
  const str = num.toString();
  if (str.length % 2 !== 0) return false;
  const mid = str.length / 2;
  const left = str.slice(0, mid);
  const right = str.slice(mid);
  if (left === right) return true;
}

export function part1(lines: string[]) {
  let sum = 0;
  const ranges = lines[0].split(',');
  ranges.forEach((range) => {
    const [start, end] = range.split('-').map(Number);
    for (let i = start; i <= end; i++) {
      if (isInvalid(i)) {
        sum += i;
      }
    }
  });
  return sum;
}

function isInvalid2(num: Number) {
  const str = num.toString();
  for (let i = 1; i <= str.length / 2; i++) {
    if (str.length % i !== 0) continue;
    const segment = str.slice(0, i);
    let repeated = '';
    for (let j = 0; j < str.length / i; j++) {
      repeated += segment;
    }
    if (repeated === str) return true;
  }
  return false;
}

export function part2(lines: string[]) {
  let sum = 0;
  const ranges = lines[0].split(',');
  ranges.forEach((range) => {
    const [start, end] = range.split('-').map(Number);
    for (let i = start; i <= end; i++) {
      if (isInvalid2(i)) {
        sum += i;
      }
    }
  });
  return sum;
}
