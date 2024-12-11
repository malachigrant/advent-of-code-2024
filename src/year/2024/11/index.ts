type Stones = Record<number, number>;

function addToStones(stones: Stones, num, count) {
  if (stones[num]) {
    stones[num] += count;
  } else {
    stones[num] = count;
  }
}
function blink(stones: Stones) {
  const newStones: Stones = {};
  Object.entries(stones).forEach(([key, count]) => {
    const num = Number(key);
    let nextNums;
    if (num === 0) {
      nextNums = [1];
    } else if (Math.floor(Math.log10(num) + 1) % 2 === 0) {
      const midMagnitude = Math.pow(10, Math.floor(Math.log10(num) + 1) / 2);
      nextNums = [Math.floor(num / midMagnitude), num % midMagnitude];
    } else {
      nextNums = [num * 2024];
    }
    nextNums.forEach((n) => addToStones(newStones, n, count));
  });
  return newStones;
}

function parseData(lines: string[]): Stones {
  return lines[0]
    .split(' ')
    .map(Number)
    .reduce((acc, num) => ({ ...acc, [num]: 1 }), {});
}

export function part1(lines: string[]) {
  let stones = parseData(lines);
  for (let i = 0; i < 25; i++) {
    stones = blink(stones);
  }
  return Object.values(stones).reduce((acc, curr) => acc + curr, 0);
}

export function part2(lines: string[]) {
  let stones = parseData(lines);
  for (let i = 0; i < 75; i++) {
    stones = blink(stones);
  }
  return Object.values(stones).reduce((acc, curr) => acc + curr, 0);
}
