import { Grid } from '../../../utils/Grid';

export function part1(lines: string[]) {
  const grid = Grid.parse(lines);
  let startPos = { x: 0, y: 0 };
  grid.forEach((value, x, y) => {
    if (value === 'S') {
      startPos = { x, y };
    }
  });
  let beams = [startPos];
  let splitCount = 0;
  const alreadyDone = {};
  const alreadySplit = {};
  while (beams.length) {
    const current = beams.pop();
    const key = `${current.x},${current.y}`;
    if (alreadyDone[key]) {
      continue;
    }
    alreadyDone[key] = true;
    for (let i = current.y; i < grid.getHeight(); i++) {
      if (grid.get(current.x, i) === '^') {
        const key2 = `${current.x},${i}`;
        if (alreadySplit[key2]) {
          break;
        }
        alreadySplit[key2] = true;
        splitCount++;
        if (!beams.some((b) => b.x === current.x - 1 && b.y === i)) {
          beams.push({ x: current.x - 1, y: i });
        }
        if (!beams.some((b) => b.x === current.x + 1 && b.y === i)) {
          beams.push({ x: current.x + 1, y: i });
        }
        break;
      }
    }
  }
  return splitCount;
}

const cache = {};

function getTimelineCount(
  grid: Grid<string>,
  startPos: { x: number; y: number },
): number {
  const cacheKey = `${startPos.x},${startPos.y}`;
  if (cache[cacheKey] !== undefined) {
    return cache[cacheKey];
  }
  const line = grid.getLine(startPos.x, startPos.y, 0, 1);
  let count = 0;
  line.some((value, index) => {
    if (value === '^') {
      count +=
        1 +
        getTimelineCount(grid, {
          x: startPos.x - 1,
          y: startPos.y + index + 1,
        }) +
        getTimelineCount(grid, {
          x: startPos.x + 1,
          y: startPos.y + index + 1,
        });
      return true;
    }
  });
  cache[cacheKey] = count;
  return count;
}

export function part2(lines: string[]) {
  const grid = Grid.parse(lines);
  let startPos = { x: 0, y: 0 };
  grid.forEach((value, x, y) => {
    if (value === 'S') {
      startPos = { x, y };
    }
  });
  return getTimelineCount(grid, startPos) + 1;
}
