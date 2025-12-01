import { Grid } from '../../../utils/Grid';

export function part1(lines: string[]) {
  const schematics = lines.join('\n').split('\n\n');
  const all = schematics.map((schematic) => {
    return Grid.parse(schematic.split('\n'));
  });
  const locks = all.filter((g) => {
    return g.getLine(0, 0, 1, 0).every((v) => v === '#');
  });
  const keys = all.filter((g) => {
    return g.getLine(0, g.getHeight() - 1, 1, 0).every((v) => v === '#');
  });
  keys.forEach((key) => key.log());
  locks.forEach((lock) => lock.log());
  const lockHeights = locks.map((lock) => {
    const height = [];
    for (let i = 0; i < lock.getWidth(); i++) {
      const line = lock.getLine(i, 0, 0, 1);
      height.push(line.findIndex((v) => v === '.'));
    }
    return height;
  });
  const keyHeights = keys.map((key) => {
    const height = [];
    for (let i = 0; i < key.getWidth(); i++) {
      const line = key.getLine(i, key.getHeight() - 1, 0, -1);
      height.push(line.findIndex((v) => v === '.'));
    }
    return height;
  });
  let count = 0;
  keyHeights.forEach((keyHeight) => {
    lockHeights.forEach((lockHeight) => {
      if (keyHeight.every((val, i) => val + lockHeight[i] <= 5)) count++;
    });
  });
  return count;
}

export function part2(lines: string[]) {
  return 0;
}
