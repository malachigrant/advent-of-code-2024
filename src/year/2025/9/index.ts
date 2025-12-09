import { Grid } from '../../../utils/Grid';
import { SparseGrid } from '../../../utils/SparseGrid';

export function part1(lines: string[]) {
  let largestArea = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const [x1, y1] = lines[i].split(',').map(Number);
      const [x2, y2] = lines[j].split(',').map(Number);
      const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
      if (area > largestArea) {
        largestArea = area;
      }
    }
  }
  return largestArea;
}

const crossoverCache = new Map<string, number>();
function getCrossovers(grid: SparseGrid<string>, x: number, y: number) {
  const key = `${x},${y}`;
  if (crossoverCache.has(key)) return crossoverCache.get(key);
  let crossovers = 0;
  let enteredFrom;
  for (let x2 = x; x2 <= 100000; x2++) {
    if (grid.get(x2 - 1, y, '.') === '.' && grid.get(x2, y) === '#') {
      crossovers++;
    } else if (grid.get(x2, y) === 'C') {
      if (grid.get(x2, y - 1, '.') === '#') {
        if (enteredFrom === 'top') {
          // we were skimming the top edge, now we are exiting
          enteredFrom = undefined;
          crossovers++;
        } else if (enteredFrom === undefined) {
          // we are skimming the bottom edge
          enteredFrom = 'bottom';
        } else {
          // didn't crossover
        }
      } else if (grid.get(x2, y + 1, '.') === '#') {
        if (enteredFrom === 'bottom') {
          // we were skimming the bottom edge, now we are exiting
          enteredFrom = undefined;
          crossovers++;
        } else if (enteredFrom === undefined) {
          // we are skimming the top edge
          enteredFrom = 'top';
        } else {
          // didn't crossover
        }
      }
    }
  }
  crossoverCache.set(key, crossovers);
  return crossovers;
}

function hasCrossoversOnPerimeter(
  grid: SparseGrid<string>,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  let crossovers = 0;
  let enteredFrom;
  for (let x = Math.min(x1, x2) + 1; x < Math.max(x1, x2); x++) {
    if (grid.get(x - 1, y1, '.') === '.' && grid.get(x, y1) === '#') {
      return true;
    } else if (grid.get(x, y1) === 'C') {
      if (grid.get(x, y1 - 1, '.') === '#') {
        if (enteredFrom === 'top') {
          // we were skimming the top edge, now we are exiting
          enteredFrom = undefined;
          return true;
        } else if (enteredFrom === undefined) {
          // we are skimming the bottom edge
          enteredFrom = 'bottom';
        } else {
          // didn't crossover
        }
      } else if (grid.get(x, y1 + 1, '.') === '#') {
        if (enteredFrom === 'bottom') {
          // we were skimming the bottom edge, now we are exiting
          enteredFrom = undefined;
          return true;
        } else if (enteredFrom === undefined) {
          // we are skimming the top edge
          enteredFrom = 'top';
        } else {
          // didn't crossover
        }
      }
    }
    if (grid.get(x - 1, y2, '.') === '.' && grid.get(x, y2) === '#') {
      return true;
    } else if (grid.get(x, y2) === 'C') {
      if (grid.get(x, y2 - 1, '.') === '#') {
        if (enteredFrom === 'top') {
          // we were skimming the top edge, now we are exiting
          enteredFrom = undefined;
          return true;
        } else if (enteredFrom === undefined) {
          // we are skimming the bottom edge
          enteredFrom = 'bottom';
        } else {
          // didn't crossover
          enteredFrom = undefined;
        }
      } else if (grid.get(x, y2 + 1, '.') === '#') {
        if (enteredFrom === 'bottom') {
          // we were skimming the bottom edge, now we are exiting
          enteredFrom = undefined;
          return true;
        } else if (enteredFrom === undefined) {
          // we are skimming the top edge
          enteredFrom = 'top';
        } else {
          // didn't crossover
          enteredFrom = undefined;
        }
      }
    }
  }
  for (let y = Math.min(y1, y2) + 1; y < Math.max(y1, y2); y++) {
    if (grid.get(x1, y - 1, '.') === '.' && grid.get(x1, y) === '#') {
      return true;
    } else if (grid.get(x1, y) === 'C') {
      if (grid.get(x1 - 1, y, '.') === '#') {
        if (enteredFrom === 'left') {
          // we were skimming the left edge, now we are exiting
          enteredFrom = undefined;
          return true;
        } else if (enteredFrom === undefined) {
          // we are skimming the right edge
          enteredFrom = 'right';
        } else {
          // didn't crossover
        }
      } else if (grid.get(x1 + 1, y, '.') === '#') {
        if (enteredFrom === 'right') {
          // we were skimming the right edge, now we are exiting
          enteredFrom = undefined;
          return true;
        } else if (enteredFrom === undefined) {
          // we are skimming the left edge
          enteredFrom = 'left';
        } else {
          // didn't crossover
        }
      }
    }
    if (grid.get(x2, y - 1, '.') === '.' && grid.get(x2, y) === '#') {
      return true;
    } else if (grid.get(x2, y) === 'C') {
      if (grid.get(x2 - 1, y, '.') === '#') {
        if (enteredFrom === 'left') {
          // we were skimming the left edge, now we are exiting
          enteredFrom = undefined;
          return true;
        } else if (enteredFrom === undefined) {
          // we are skimming the right edge
          enteredFrom = 'right';
        } else {
          // didn't crossover
          enteredFrom = undefined;
        }
      } else if (grid.get(x2 + 1, y, '.') === '#') {
        if (enteredFrom === 'right') {
          // we were skimming the right edge, now we are exiting
          enteredFrom = undefined;
          return true;
        } else if (enteredFrom === undefined) {
          // we are skimming the left edge
          enteredFrom = 'left';
        } else {
          // didn't crossover
          enteredFrom = undefined;
        }
      }
    }
  }
  return crossovers;
}

const cache = new Map<string, boolean>();

function isInside(grid: SparseGrid<string>, x: number, y: number) {
  const key = `${x},${y}`;
  if (cache.has(key)) return cache.get(key);
  else {
    if (grid.get(x, y, '.') !== '.' || getCrossovers(grid, x, y) % 2 === 1) {
      cache.set(key, true);
      return true;
    } else {
      cache.set(key, false);
      return false;
    }
  }
}

export function part2(lines: string[]) {
  const nodes = [];
  const grid = new SparseGrid<string>();
  lines.forEach((line, i) => {
    const [x, y] = line.split(',').map(Number);
    nodes.push({ x, y });
    grid.set(x, y, 'C');
    if (i === 0) return;
    nodes[i - 1].next = nodes[i];
    nodes[i].prev = nodes[i - 1];
  });
  nodes[nodes.length - 1].next = nodes[0];
  nodes[0].prev = nodes[nodes.length - 1];
  let currentNode = nodes[0];
  do {
    const x1 = currentNode.x;
    const y1 = currentNode.y;
    const x2 = currentNode.next.x;
    const y2 = currentNode.next.y;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    for (let step = 1; step < steps; step++) {
      const x = x1 + Math.round((dx * step) / steps);
      const y = y1 + Math.round((dy * step) / steps);
      grid.set(x, y, '#');
    }
    currentNode = currentNode.next;
  } while (currentNode !== nodes[0]);
  let largestArea = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const [x1, y1] = lines[i].split(',').map(Number);
      const [x2, y2] = lines[j].split(',').map(Number);
      let area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
      if (area > largestArea) {
        if (
          nodes.some((node) => {
            const nx = node.x;
            const ny = node.y;
            return (
              nx > Math.min(x1, x2) &&
              nx < Math.max(x1, x2) &&
              ny > Math.min(y1, y2) &&
              ny < Math.max(y1, y2)
            );
          })
        ) {
          area = 0;
          continue;
        }
        if (
          isInside(grid, x1, y1) &&
          isInside(grid, x2, y2) &&
          isInside(grid, x1, y2) &&
          isInside(grid, x2, y1)
        ) {
        } else {
          area = 0;
          continue;
        }
        if (hasCrossoversOnPerimeter(grid, x1, y1, x2, y2)) {
          area = 0;
          continue;
        }

        if (area > largestArea) {
          largestArea = area;
        }
      }
    }
  }
  return largestArea;
}
