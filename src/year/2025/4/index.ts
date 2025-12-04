import { Grid } from '../../../utils/Grid';

export function part1(lines: string[]) {
  const grid = Grid.parse(lines);
  let count = 0;
  grid.forEach((value, x, y) => {
    if (value === '@') {
      let adjacentCount = 0;
      grid.getNeighbours(x, y, true).forEach((neighbour) => {
        if (neighbour.value === '@') {
          adjacentCount++;
        }
      });
      if (adjacentCount < 4) {
        count++;
      }
    }
  });
  return count;
}

export function part2(lines: string[]) {
  const grid = Grid.parse(lines);
  let count = 0;
  let currentCount;
  do {
    currentCount = 0;
    grid.forEach((value, x, y) => {
      if (value === '@') {
        let adjacentCount = 0;
        grid.getNeighbours(x, y, true).forEach((neighbour) => {
          if (neighbour.value === '@') {
            adjacentCount++;
          }
        });
        if (adjacentCount < 4) {
          currentCount++;
          count++;
          grid.set(x, y, '.');
        }
      }
    });
  } while (currentCount > 0);
  return count;
}
