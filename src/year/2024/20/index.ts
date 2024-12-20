import { Grid } from '../../../utils/Grid';

function findAvailableSkips(
  lines: string[],
  minPicoSecondsSaved: number,
  maxJumpLength: number,
) {
  let startX, startY, endX, endY;
  const grid = Grid.parse(lines).map((val, x, y) => {
    if (val === 'S') {
      startX = x;
      startY = y;
      return '.';
    } else if (val === 'E') {
      endX = x;
      endY = y;
      return '.';
    }
    return val;
  });
  const visitedGrid = grid.bfs(startX, startY);
  const regularShortest = visitedGrid.get(endX, endY);
  const jumpLocations: Record<string, number[]> = {};
  visitedGrid.forEach((val, x, y) => {
    if (val >= 0 && val <= regularShortest - minPicoSecondsSaved) {
      visitedGrid.forEach((val2, x2, y2) => {
        if (val2 >= 0 && Math.abs(x - x2) + Math.abs(y - y2) <= maxJumpLength) {
          jumpLocations[`${x},${y},${x2},${y2}`] = [x, y, x2, y2];
        }
      });
    }
  });
  let sum = 0;
  Object.values(jumpLocations).forEach((jump, i) => {
    const [x1, y1, x2, y2] = jump;
    const diff = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    const startSum = visitedGrid.get(x1, y1);
    const endSum = visitedGrid.get(x2, y2);
    if (startSum >= endSum) return;
    const dist = endSum - startSum - diff;
    if (dist >= minPicoSecondsSaved) sum++;
  });
  return sum;
}

export function part1(lines: string[], testMode) {
  const minPicoSecondsSaved = testMode ? 1 : 100;
  return findAvailableSkips(lines, minPicoSecondsSaved, 2);
}

export function part2(lines: string[], testMode) {
  const picoSecondsSaved = testMode ? 50 : 100;
  return findAvailableSkips(lines, picoSecondsSaved, 20);
}
