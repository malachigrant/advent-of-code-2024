import { Grid } from '../../../utils/Grid';
import { binaryFind } from '../../../utils/SortingUtil';

function checkSteps(
  gridSize: number,
  lines: string[],
  byteCount: number,
): number {
  const grid = Grid.of(gridSize, gridSize, ' ');
  lines.forEach((line, i) => {
    if (i >= byteCount) return;
    const [x, y] = line.split(',').map(Number);
    grid.set(x, y, '#');
  });
  const visited = grid.bfs(0, 0);
  return visited.get(gridSize - 1, gridSize - 1);
}

export function part1(lines: string[], testMode) {
  const gridSize = testMode ? 7 : 71;
  const firstXBytes = testMode ? 12 : 1024;
  return checkSteps(gridSize, lines, firstXBytes);
}

export function part2(lines: string[], testMode) {
  const gridSize = testMode ? 7 : 71;
  function binFn(num: number) {
    const result = checkSteps(gridSize, lines, num);
    if (result === -1) return 1;
    return -1;
  }
  return lines[binaryFind(0, lines.length - 1, binFn)];
}
