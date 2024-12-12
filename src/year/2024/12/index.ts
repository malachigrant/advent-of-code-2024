import { Grid } from '../../../utils/Grid';

interface AreaData {
  area: number;
  perimeter: number;
  walls?: Record<string, number>;
}

function visitAllConnected(
  visited: Grid<number>,
  grid: Grid<string>,
  label: string,
  x: number,
  y: number,
  areaObj: AreaData,
) {
  if (visited.get(x, y)) return;
  visited.set(x, y, 1);
  areaObj.area++;
  grid.getNeighbours(x, y).forEach((n) => {
    if (n.value === label)
      visitAllConnected(visited, grid, label, n.x, n.y, areaObj);
    else {
      areaObj.perimeter++;
      if (areaObj.walls !== undefined) {
        let dir;
        if (n.y != y) {
          dir = n.y > y ? 'down' : 'up';
        } else {
          dir = n.x > x ? 'right' : 'left';
        }
        const key = `${x},${y},${dir}`;
        areaObj.walls[key] = 1;
      }
    }
  });
}

export function part1(lines: string[]) {
  const grid = new Grid(lines.map((line) => line.split('')));
  const visitedGrid = new Grid(
    lines.map((line) => line.split('').map(() => 0)),
  );
  const areas: AreaData[] = [];
  grid.forEach((val, x, y) => {
    if (visitedGrid.get(x, y)) return;
    let area = { area: 0, perimeter: 0 };
    areas.push(area);
    visitAllConnected(visitedGrid, grid, val, x, y, area);
  });
  let sum = 0;
  areas.forEach((val) => {
    sum += val.area * val.perimeter;
  });
  return sum;
}

export function part2(lines: string[]) {
  const grid = new Grid(lines.map((line) => line.split('')));
  const visitedGrid = new Grid(
    lines.map((line) => line.split('').map(() => 0)),
  );
  const areas: AreaData[] = [];
  grid.forEach((val, x, y) => {
    if (visitedGrid.get(x, y)) return;
    let area = { area: 0, perimeter: 0, walls: {} };
    areas.push(area);
    visitAllConnected(visitedGrid, grid, val, x, y, area);
  });
  let sum = 0;
  areas.forEach((area) => {
    let count = 0;
    Object.keys(area.walls).forEach((key) => {
      if (!area.walls[key]) return;
      count++;
      area[key] = 0;
      const [xStr, yStr, dir] = key.split(',');
      const x = Number(xStr);
      const y = Number(yStr);
      if (dir === 'up' || dir === 'down') {
        for (let i = 1; ; i++) {
          const newKey = `${x + i},${y},${dir}`;
          if (area.walls[newKey]) area.walls[newKey] = 0;
          else break;
        }
        for (let i = 1; ; i++) {
          const newKey = `${x - i},${y},${dir}`;
          if (area.walls[newKey]) area.walls[newKey] = 0;
          else break;
        }
      } else if (dir === 'left' || dir === 'right') {
        for (let i = 1; ; i++) {
          const newKey = `${x},${y + i},${dir}`;
          if (area.walls[newKey]) area.walls[newKey] = 0;
          else break;
        }
        for (let i = 1; ; i++) {
          const newKey = `${x},${y - i},${dir}`;
          if (area.walls[newKey]) area.walls[newKey] = 0;
          else break;
        }
      }
    });
    area.perimeter = count;
  });

  areas.forEach((val) => {
    sum += val.area * val.perimeter;
  });
  return sum;
}
