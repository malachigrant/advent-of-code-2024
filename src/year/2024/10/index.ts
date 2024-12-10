import { Grid } from '../../../utils/Grid';

function countAccessibleNines(
  grid: Grid<number>,
  x,
  y,
): { set: Set<string>; distinctPaths: number } {
  const set = new Set<string>();
  let distinctPaths = 0;
  const val = grid.get(x, y);
  const neighbours = grid.getNeighbours(x, y);
  neighbours.forEach((neighbour) => {
    if (val === 8 && neighbour.value === 9) {
      distinctPaths++;
      set.add(`${neighbour.x},${neighbour.y}`);
    }
    if (neighbour.value === val + 1) {
      const { set: innerSet, distinctPaths: innerDistinctPaths } =
        countAccessibleNines(grid, neighbour.x, neighbour.y);
      innerSet.forEach((coord) => set.add(coord));
      distinctPaths += innerDistinctPaths;
    }
  });
  return { set, distinctPaths };
}

export function part1(lines: string[]) {
  const grid = new Grid(lines.map((line) => line.split('').map(Number)));
  const trailheads = [];
  grid.forEach((val, x, y) => {
    if (val === 0) {
      trailheads.push([x, y]);
    }
  });
  let sum = 0;
  trailheads.forEach(([x, y]) => {
    const { set } = countAccessibleNines(grid, x, y);
    sum += set.size;
  });
  return sum;
}

export function part2(lines: string[]) {
  const grid = new Grid(lines.map((line) => line.split('').map(Number)));
  const trailheads = [];
  grid.forEach((val, x, y) => {
    if (val === 0) {
      trailheads.push([x, y]);
    }
  });
  let sum = 0;
  trailheads.forEach(([x, y]) => {
    const { distinctPaths } = countAccessibleNines(grid, x, y);
    sum += distinctPaths;
  });
  return sum;
}
