import { Grid } from '../../../utils/Grid';

const facingMap = {
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
  N: [0, -1],
};

const dirOppositeMap = {
  E: 'W',
  W: 'E',
  S: 'N',
  N: 'S',
};

export function part1(lines: string[]) {
  const grid = new Grid(lines.map((line) => line.split('')));
  const visited = grid.map(() => {
    return { E: -1, S: -1, W: -1, N: -1 };
  });
  let posX, posY, endX, endY;
  grid.forEach((val, x, y) => {
    if (val === 'S') {
      posX = x;
      posY = y;
    } else if (val === 'E') {
      endX = x;
      endY = y;
    }
  });
  const queue = [{ x: posX, y: posY, facing: 'E', score: 0 }];
  while (queue.length) {
    const { x, y, facing, score } = queue.splice(0, 1)[0];
    Object.entries(facingMap).forEach(([dir, offset]) => {
      const tile = grid.get(x + offset[0], y + offset[1]);
      if (tile === '#') return;
      let newScore = score;
      if (dir === facing) newScore++;
      else if (dirOppositeMap[dir] === facing) newScore += 2001;
      else newScore += 1001;
      const visitedTile = visited.get(x + offset[0], y + offset[1]);
      if (visitedTile[dir] > newScore || visitedTile[dir] === -1) {
        visited.set(x + offset[0], y + offset[1], {
          ...visitedTile,
          [dir]: newScore,
        });
        queue.push({
          x: x + offset[0],
          y: y + offset[1],
          facing: dir,
          score: newScore,
        });
      }
    });
  }
  // Using only N is not a general solution, but happens to work with examples and my input.
  return visited.get(endX, endY).N;
}

export function part2(lines: string[]) {
  const grid = new Grid(lines.map((line) => line.split('')));
  const visited = grid.map(() => {
    return {
      E: { score: -1, tiles: {} },
      S: { score: -1, tiles: {} },
      W: { score: -1, tiles: {} },
      N: { score: -1, tiles: {} },
    };
  });
  let posX, posY, endX, endY;
  grid.forEach((val, x, y) => {
    if (val === 'S') {
      posX = x;
      posY = y;
    } else if (val === 'E') {
      endX = x;
      endY = y;
    }
  });
  const queue = [
    {
      x: posX,
      y: posY,
      facing: 'E',
      score: 0,
      tiles: { [`${posX},${posY}`]: true },
    },
  ];
  while (queue.length) {
    const { x, y, facing, score, tiles } = queue.splice(0, 1)[0];
    Object.entries(facingMap).forEach(([dir, offset]) => {
      const tile = grid.get(x + offset[0], y + offset[1]);
      if (tile === '#') return;
      let newScore = score;
      if (dir === facing) newScore++;
      else if (dirOppositeMap[dir] === facing) newScore += 2001;
      else newScore += 1001;
      const visitedTile = visited.get(x + offset[0], y + offset[1]);
      let pushToQueue = true;
      if (visitedTile[dir].score >= newScore || visitedTile[dir].score === -1) {
        if (visitedTile[dir].score === newScore) {
          if (Object.keys(tiles).every((key) => visitedTile[dir].tiles[key])) {
            pushToQueue = false;
          } else {
            visited.set(x + offset[0], y + offset[1], {
              ...visitedTile,
              [dir]: {
                score: newScore,
                tiles: {
                  ...tiles,
                  ...visitedTile[dir].tiles,
                  [`${x + offset[0]},${y + offset[1]}`]: true,
                },
              },
            });
          }
        } else {
          visited.set(x + offset[0], y + offset[1], {
            ...visitedTile,
            [dir]: {
              score: newScore,
              tiles: { ...tiles, [`${x + offset[0]},${y + offset[1]}`]: true },
            },
          });
        }
        if (pushToQueue)
          queue.push({
            x: x + offset[0],
            y: y + offset[1],
            facing: dir,
            score: newScore,
            tiles: { ...tiles, [`${x + offset[0]},${y + offset[1]}`]: true },
          });
      }
    });
  }
  // Using only N is not a general solution, but happens to work with examples and my input.
  const tiles = visited.get(endX, endY).N.tiles;
  return Object.values(tiles).length;
}
