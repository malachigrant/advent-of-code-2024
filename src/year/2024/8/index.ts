type Grid = string[][];
type AntennaData = Record<string, [number, number][]>;

function getData(lines: string[]): [Grid, AntennaData] {
  const grid = lines.map((row) => row.split(''));
  const antenna: Record<string, [number, number][]> = {};
  grid.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val !== '.') {
        if (!antenna[val]) {
          antenna[val] = [[x, y]];
        } else {
          antenna[val].push([x, y]);
        }
      }
    });
  });
  return [grid, antenna];
}

function getAntinodePositions(
  grid: Grid,
  antenna: AntennaData,
  allowMultiple = false,
) {
  const locations = new Set();
  Object.entries(antenna).find(([_, positions]) => {
    const positionPairs: [number, number][][] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        positionPairs.push([positions[i], positions[j]]);
      }
    }
    positionPairs.find((pair) => {
      const [x1, y1] = pair[0];
      const [x2, y2] = pair[1];
      const diffx = x1 - x2;
      const diffy = y1 - y2;
      for (let i = allowMultiple ? 0 : 1; ; i++) {
        const newx1 = x2 - diffx * i;
        const newx2 = x1 + diffx * i;
        const newy1 = y2 - diffy * i;
        const newy2 = y1 + diffy * i;
        let hasPlaced = false;
        if (
          newx1 >= 0 &&
          newx1 < grid[0].length &&
          newy1 >= 0 &&
          newy1 < grid.length
        ) {
          locations.add(`${newx1},${newy1}`);
          hasPlaced = true;
        }
        if (
          newx2 >= 0 &&
          newx2 < grid[0].length &&
          newy2 >= 0 &&
          newy2 < grid.length
        ) {
          locations.add(`${newx2},${newy2}`);
          hasPlaced = true;
        }
        if (!hasPlaced || !allowMultiple) break;
      }
    });
  });
  return locations;
}

export function part1(lines: string[]) {
  const [grid, antenna] = getData(lines);
  const locations = getAntinodePositions(grid, antenna);
  return locations.size;
}

export function part2(lines: string[]) {
  const [grid, antenna] = getData(lines);
  const locations = getAntinodePositions(grid, antenna, true);
  return locations.size;
}
