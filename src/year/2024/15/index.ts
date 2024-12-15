import { Grid } from '../../../utils/Grid';

const offsetMap = {
  '<': [-1, 0],
  '>': [1, 0],
  '^': [0, -1],
  v: [0, 1],
};
function moveRobot(grid: Grid<string>, robot, move: string) {
  const offset = offsetMap[move];
  const nextTile = grid.get(robot.x + offset[0], robot.y + offset[1]);
  if (nextTile === '.') {
    grid.set(robot.x, robot.y, '.');
    robot.x += offset[0];
    robot.y += offset[1];
    grid.set(robot.x, robot.y, '@');
  } else if (nextTile === '#') {
    return;
  } else {
    for (let i = 2; ; i++) {
      const tile = grid.get(robot.x + offset[0] * i, robot.y + offset[1] * i);
      if (tile === '.') {
        grid.set(robot.x + offset[0] * i, robot.y + offset[1] * i, 'O');
        grid.set(robot.x, robot.y, '.');
        robot.x += offset[0];
        robot.y += offset[1];
        grid.set(robot.x, robot.y, '@');
        return;
      } else if (tile === '#') {
        return;
      }
    }
  }
}

function canMoveBox(
  grid: Grid<string>,
  x: number,
  y: number,
  offset: [number, number],
): boolean {
  let box = [[x, y]];
  if (grid.get(x, y) === '[') {
    box.push([x + 1, y]);
  } else {
    box.push([x - 1, y]);
  }
  let canMove = true;
  const nextBoxes = [];
  box.forEach(([x, y], i) => {
    const otherBox = i ? box[0] : box[1];
    if (otherBox[0] === x + offset[0] && otherBox[1] === y + offset[1]) {
      return;
    }
    const nextTile = grid.get(x + offset[0], y + offset[1]);
    if (nextTile === '.' || x + offset[0] === otherBox[0]) {
      return;
    }
    if (nextTile === '#') {
      canMove = false;
      return;
    } else {
      nextBoxes.push([x + offset[0], y + offset[1]]);
    }
  });
  if (canMove && nextBoxes.length) {
    // maybe can move, check boxes
    if (
      (grid.get(nextBoxes[0][0], nextBoxes[0][1]) === '[' &&
        (nextBoxes.length === 1 || nextBoxes[0][0] < nextBoxes[1][0])) ||
      (grid.get(nextBoxes[0][0], nextBoxes[0][1]) === ']' &&
        (nextBoxes.length === 1 || nextBoxes[0][0] > nextBoxes[1][0]))
    ) {
      // same box
      canMove = canMoveBox(grid, nextBoxes[0][0], nextBoxes[0][1], offset);
    } else {
      canMove = nextBoxes.every((box) =>
        canMoveBox(grid, box[0], box[1], offset),
      );
    }
  }
  if (!canMove) return false;
  // can move
  return true;
}
function moveBox(
  grid: Grid<string>,
  x: number,
  y: number,
  offset: [number, number],
) {
  let box = [[x, y, grid.get(x, y)]];
  if (box[0][2] === '[') {
    box.push([x + 1, y, ']']);
  } else {
    box.push([x - 1, y, '[']);
  }
  const nextBoxes = [];
  box.forEach(([x, y, symbol], i) => {
    const otherBox = i ? box[0] : box[1];
    if (otherBox[0] === x + offset[0] && otherBox[1] === y + offset[1]) {
      return;
    }
    const nextTile = grid.get(x + offset[0], y + offset[1]);
    if (nextTile === '.') {
      return;
    }
    nextBoxes.push([x + offset[0], y + offset[1]]);
  });
  if (nextBoxes.length) {
    if (
      (grid.get(nextBoxes[0][0], nextBoxes[0][1]) === '[' &&
        (nextBoxes.length === 1 || nextBoxes[0][0] < nextBoxes[1][0])) ||
      (grid.get(nextBoxes[0][0], nextBoxes[0][1]) === ']' &&
        (nextBoxes.length === 1 || nextBoxes[0][0] > nextBoxes[1][0]))
    ) {
      // same box
      moveBox(grid, nextBoxes[0][0], nextBoxes[0][1], offset);
    } else {
      nextBoxes.forEach((box) => moveBox(grid, box[0], box[1], offset));
    }
  }
  box.forEach(([x, y, symbol]) => {
    grid.set(x, y, '.');
  });
  box.forEach(([x, y, symbol]) => {
    grid.set(x + offset[0], y + offset[1], symbol);
  });
}

function moveRobot2(grid: Grid<string>, robot, move: string) {
  const offset = offsetMap[move];
  const nextTile = grid.get(robot.x + offset[0], robot.y + offset[1]);
  if (nextTile === '.') {
    grid.set(robot.x, robot.y, '.');
    robot.x += offset[0];
    robot.y += offset[1];
    grid.set(robot.x, robot.y, '@');
  } else if (nextTile === '#') {
    return;
  } else {
    if (canMoveBox(grid, robot.x + offset[0], robot.y + offset[1], offset)) {
      moveBox(grid, robot.x + offset[0], robot.y + offset[1], offset);
      grid.set(robot.x, robot.y, '.');
      robot.x += offset[0];
      robot.y += offset[1];
      grid.set(robot.x, robot.y, '@');
    }
  }
}

export function part1(lines: string[]) {
  const [gridStr, movesStr] = lines.join('\n').split('\n\n');
  const grid = new Grid(gridStr.split('\n').map((line) => line.split('')));
  const robot = { x: 0, y: 0 };
  grid.forEach((cell, x, y) => {
    if (cell === '@') {
      robot.x = x;
      robot.y = y;
    }
  });
  const moves = movesStr.split('').filter((move) => !!offsetMap[move]);
  moves.forEach((move) => {
    moveRobot(grid, robot, move);
  });
  let sum = 0;
  grid.forEach((val, x, y) => {
    if (val === 'O') {
      sum += y * 100 + x;
    }
  });
  return sum;
}

export function part2(lines: string[]) {
  const [gridStr, movesStr] = lines.join('\n').split('\n\n');
  const grid = new Grid(
    gridStr.split('\n').map((line) =>
      line
        .split('')
        .map((char) => {
          if (char === '#') return '##';
          if (char === '@') return '@.';
          if (char === 'O') return '[]';
          if (char === '.') return '..';
        })
        .join('')
        .split(''),
    ),
  );
  const robot = { x: 0, y: 0 };
  grid.forEach((cell, x, y) => {
    if (cell === '@') {
      robot.x = x;
      robot.y = y;
    }
  });
  const moves = movesStr.split('').filter((move) => !!offsetMap[move]);
  moves.forEach((move) => {
    moveRobot2(grid, robot, move);
  });
  let sum = 0;
  grid.forEach((val, x, y) => {
    if (val === '[') {
      sum += y * 100 + x;
    }
  });
  return sum;
}
