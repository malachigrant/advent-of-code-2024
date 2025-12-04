function getHighest(line: string, count) {
  let maxDigit = 0;
  let maxDigitIndex = -1;
  for (let i = 0; i < line.length - count + 1; i++) {
    if (Number(line[i]) > maxDigit) {
      maxDigit = Number(line[i]);
      maxDigitIndex = i;
    }
  }
  if (count === 1) {
    return maxDigit;
  }
  return Number(
    maxDigit.toString() + getHighest(line.slice(maxDigitIndex + 1), count - 1),
  );
}

export function part1(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    sum += getHighest(line, 2);
  });
  return sum;
}

export function part2(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    let max = getHighest(line, 12);
    sum += max;
  });
  return sum;
}
