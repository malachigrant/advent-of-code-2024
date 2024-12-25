import { Grid } from '../../../utils/Grid';

export function part1(lines: string[]) {
  let grid = Grid.parse(lines);
  while (true) {
    let changed = false;
    grid = grid.map((val, x, y) => {
      if (val === '.') return '.';
      let adjacentSearchChar;
      if (val === 'L') adjacentSearchChar = '#';
      else if (val === '#') adjacentSearchChar = '#';
      const adj = grid
        .getNeighbours(x, y, true)
        .filter((n) => n.value === adjacentSearchChar).length;
      if (val === 'L' && adj === 0) {
        changed = true;
        return '#';
      }
      if (val === '#' && adj >= 4) {
        changed = true;
        return 'L';
      }
      return val;
    });
    if (!changed) {
      return grid.count('#');
    }
  }
}

const offsets = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

export function part2(lines: string[]) {
  let grid = Grid.parse(lines);
  while (true) {
    let changed = false;
    grid = grid.map((val, x, y) => {
      if (val === '.') return '.';
      const counts = { empty: 0, occupied: 0 };
      offsets.forEach(([dx, dy]) => {
        const line = grid.getLine(x, y, dx, dy);
        const first = line.find((v) => v !== '.');
        if (first === '#') counts.occupied++;
        if (first === 'L') counts.empty++;
      });
      if (val === 'L' && counts.occupied === 0) {
        changed = true;
        return '#';
      }
      if (val === '#' && counts.occupied >= 5) {
        changed = true;
        return 'L';
      }
      return val;
    });
    if (!changed) {
      return grid.count('#');
    }
  }
}
