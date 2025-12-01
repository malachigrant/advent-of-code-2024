import { getLoopingNum } from '../../../utils/NumberUtil';

export function part1(lines: string[]) {
  let dial = 50;
  let count = 0;
  lines.forEach((line) => {
    const dir = line[0];
    const amount = parseInt(line.slice(1), 10);
    if (dir === 'R') {
      dial += amount;
    } else {
      dial -= amount;
    }
    dial = getLoopingNum(dial, 0, 100);
    if (dial === 0) {
      count++;
    }
  });

  return count;
}

export function part2(lines: string[]) {
  let dial = 50;
  let count = 0;
  lines.forEach((line) => {
    const dir = line[0];
    let amount = parseInt(line.slice(1), 10);
    if (dir === 'L') {
      amount *= -1;
    }
    const lastDial = dial;
    dial += amount;
    const newDial = getLoopingNum(dial, 0, 100);
    const loops = Math.abs(dial - newDial) / 100;
    count += loops;
    if (newDial === 0 && amount < 0) {
      count++;
    }
    if (lastDial === 0 && loops > 0 && dir === 'L') {
      count--;
    }
    dial = newDial;
  });

  return count;
}
