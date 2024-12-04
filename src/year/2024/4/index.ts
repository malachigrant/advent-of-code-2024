function safeGet(grid, x, y) {
  if (grid[y] && grid[y][x]) {
    return grid[y][x];
  }
  return null;
}
function checkXmas(grid, x, y) {
  let total = 0;
  if (
    safeGet(grid, x + 1, y) === 'M' &&
    safeGet(grid, x + 2, y) === 'A' &&
    safeGet(grid, x + 3, y) === 'S'
  ) {
    total++;
  }
  if (
    safeGet(grid, x - 1, y) === 'M' &&
    safeGet(grid, x - 2, y) === 'A' &&
    safeGet(grid, x - 3, y) === 'S'
  ) {
    total++;
  }
  if (
    safeGet(grid, x, y + 1) === 'M' &&
    safeGet(grid, x, y + 2) === 'A' &&
    safeGet(grid, x, y + 3) === 'S'
  ) {
    total++;
  }
  if (
    safeGet(grid, x, y - 1) === 'M' &&
    safeGet(grid, x, y - 2) === 'A' &&
    safeGet(grid, x, y - 3) === 'S'
  ) {
    total++;
  }

  if (
    safeGet(grid, x + 1, y + 1) === 'M' &&
    safeGet(grid, x + 2, y + 2) === 'A' &&
    safeGet(grid, x + 3, y + 3) === 'S'
  ) {
    total++;
  }
  if (
    safeGet(grid, x + 1, y - 1) === 'M' &&
    safeGet(grid, x + 2, y - 2) === 'A' &&
    safeGet(grid, x + 3, y - 3) === 'S'
  ) {
    total++;
  }
  if (
    safeGet(grid, x - 1, y - 1) === 'M' &&
    safeGet(grid, x - 2, y - 2) === 'A' &&
    safeGet(grid, x - 3, y - 3) === 'S'
  ) {
    total++;
  }
  if (
    safeGet(grid, x - 1, y + 1) === 'M' &&
    safeGet(grid, x - 2, y + 2) === 'A' &&
    safeGet(grid, x - 3, y + 3) === 'S'
  ) {
    total++;
  }
  return total;
}

export function part1(lines: string[]) {
  let sum = 0;
  const grid = lines.map((line) => line.split(''));
  grid.forEach((row, y) => {
    row.forEach((letter, x) => {
      if (letter === 'X') {
        sum += checkXmas(grid, x, y);
      }
    });
  });
  return sum;
}

function checkXmas2(grid, x, y) {
  let total = 0;
  if (
    safeGet(grid, x - 1, y - 1) === 'M' &&
    safeGet(grid, x + 1, y + 1) === 'S' &&
    safeGet(grid, x + 1, y - 1) === 'M' &&
    safeGet(grid, x - 1, y + 1) === 'S'
  ) {
    total++;
  }
  if (
    safeGet(grid, x - 1, y - 1) === 'M' &&
    safeGet(grid, x + 1, y + 1) === 'S' &&
    safeGet(grid, x + 1, y - 1) === 'S' &&
    safeGet(grid, x - 1, y + 1) === 'M'
  ) {
    total++;
  }
  if (
    safeGet(grid, x - 1, y - 1) === 'S' &&
    safeGet(grid, x + 1, y + 1) === 'M' &&
    safeGet(grid, x + 1, y - 1) === 'S' &&
    safeGet(grid, x - 1, y + 1) === 'M'
  ) {
    total++;
  }
  if (
    safeGet(grid, x - 1, y - 1) === 'S' &&
    safeGet(grid, x + 1, y + 1) === 'M' &&
    safeGet(grid, x + 1, y - 1) === 'M' &&
    safeGet(grid, x - 1, y + 1) === 'S'
  ) {
    total++;
  }
  return total;
}

export function part2(lines: string[]) {
  let sum = 0;
  const grid = lines.map((line) => line.split(''));
  grid.forEach((row, y) => {
    row.forEach((letter, x) => {
      if (letter === 'A') {
        sum += checkXmas2(grid, x, y);
      }
    });
  });
  return sum;
}
