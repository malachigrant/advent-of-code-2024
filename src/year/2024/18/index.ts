import { Grid } from '../../../utils/Grid';

export function part1(lines: string[], testMode) {
  const gridSize = testMode ? 7 : 71;
  const firstXBytes = testMode ? 12 : 1024;
  const grid = Grid.of(gridSize, gridSize, ' ');
  lines.forEach((line, i) => {
    if (i >= firstXBytes) return;
    const [x, y] = line.split(',').map(Number);
    grid.set(x, y, '#');
  });
  const visited = grid.map(() => -1);
  visited.set(0, 0, 0);
  const queue = [[0, 0, 0]];
  while (queue.length) {
    const [x, y, steps] = queue.splice(0, 1)[0];
    const n = grid.getNeighbours(x, y);
    n.forEach((n) => {
      const nSteps = visited.get(n.x, n.y, -1);
      if (grid.get(n.x, n.y, '#') === '#') return;
      if (nSteps > steps + 1 || nSteps === -1) {
        visited.set(n.x, n.y, steps + 1);
        queue.push([n.x, n.y, steps + 1]);
      }
    });
  }
  return visited.get(gridSize - 1, gridSize - 1);
}

export function part2(lines: string[], testMode) {
  const grid = Grid.of(71, 71, ' ');
  lines.forEach((line, i) => {
    if (i === 2960) console.log(line);
    const [x, y] = line.split(',').map(Number);
    grid.set(x, y, '#');
  });
  const visited = grid.map(() => -1);
  visited.set(0, 0, 0);
  const queue = [[0, 0, 0]];
  while (queue.length) {
    const [x, y, steps] = queue.splice(0, 1)[0];
    const n = grid.getNeighbours(x, y);
    n.forEach((n) => {
      const nSteps = visited.get(n.x, n.y, -1);
      if (grid.get(n.x, n.y, '#') === '#') return;
      if (nSteps > steps + 1 || nSteps === -1) {
        visited.set(n.x, n.y, steps + 1);
        queue.push([n.x, n.y, steps + 1]);
      }
    });
  }
  return visited.get(70, 70);
}
