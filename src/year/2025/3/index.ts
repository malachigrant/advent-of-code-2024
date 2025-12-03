function getHighest(line: string, count) {
  let max = 0;
  for (let i = 0; i < line.length - count + 1; i++) {
    if (Number(line[i]) <= Number(max.toString()[0])) {
      continue;
    }
    max = Math.max(
      max,
      Number(
        count === 1
          ? line[i]
          : line[i] + getHighest(line.slice(i + 1), count - 1),
      ),
    );
  }
  return max;
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
