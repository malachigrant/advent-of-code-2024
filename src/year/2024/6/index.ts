const directions = {
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
};
const nextDir = {
  up: 'right',
  right: 'down',
  down: 'left',
  left: 'up',
};

function traverseGrid(grid) {
  let guardState;
  grid.find((row, y) =>
    row.find((val, x) => {
      if (val === '^') {
        guardState = { x, y, facing: 'up' };
        grid[y][x] = guardState.facing;
        guardState.y--;
      }
    }),
  );
  while (true) {
    if (grid[guardState.y][guardState.x] === guardState.facing) {
      return true;
    }
    const newPos = {
      x: guardState.x + directions[guardState.facing][0],
      y: guardState.y + directions[guardState.facing][1],
    };
    const val = grid[newPos.y]?.[newPos.x];
    if (!val) {
      grid[guardState.y][guardState.x] = guardState.facing;
      break;
    }
    if (val !== '#') {
      grid[guardState.y][guardState.x] = guardState.facing;
      guardState.x = newPos.x;
      guardState.y = newPos.y;
    } else {
      guardState.facing = nextDir[guardState.facing];
    }
  }
  return false;
}
export function part1(lines: string[]) {
  const grid = lines.map((line) => line.split(''));
  traverseGrid(grid);
  let sum = 0;
  grid.forEach((row) => {
    row.forEach((val) => {
      if (val !== '#' && val !== '.') sum++;
    });
  });
  return sum;
}

export function part2(lines: string[]) {
  const grid = lines.map((line) => line.split(''));
  traverseGrid(grid);
  const positionsToCheck = [];
  grid.forEach((row, y) =>
    row.forEach((val, x) => {
      if (val !== '#' && val !== '.') {
        positionsToCheck.push([x, y]);
      }
    }),
  );
  let sum = 0;
  positionsToCheck.forEach(([x, y], i) => {
    const grid2 = lines.map((line) => line.split(''));
    if (grid2[y][x] !== '.') return;
    grid2[y][x] = '#';
    const isLooping = traverseGrid(grid2);
    if (isLooping) {
      sum++;
    }
  });
  return sum;
}
