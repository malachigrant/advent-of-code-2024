import { rotateCoordinate } from '../../../utils/NumberUtil';

const directions = {
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
  N: [0, -1],
};

const rightMap = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
};

const leftMap = {
  N: 'W',
  W: 'S',
  S: 'E',
  E: 'N',
};

function rotateRight(currentFacing, degrees) {
  let resultFacing = currentFacing;
  while (degrees > 0) {
    resultFacing = rightMap[resultFacing];
    degrees -= 90;
  }
  return resultFacing;
}
function rotateLeft(currentFacing, degrees) {
  let resultFacing = currentFacing;
  while (degrees > 0) {
    resultFacing = leftMap[resultFacing];
    degrees -= 90;
  }
  return resultFacing;
}

export function part1(lines: string[]) {
  let x = 0,
    y = 0,
    facing = 'E';
  lines.forEach((line) => {
    const [, action, countStr] = line.match(/([FNESWLR])(\d+)/);
    const count = Number(countStr);
    if (action === 'L') {
      facing = rotateLeft(facing, count);
    } else if (action === 'R') {
      facing = rotateRight(facing, count);
    } else if (action === 'N') {
      y -= count;
    } else if (action === 'S') {
      y += count;
    } else if (action === 'W') {
      x -= count;
    } else if (action === 'E') {
      x += count;
    } else if (action === 'F') {
      x += directions[facing][0] * count;
      y += directions[facing][1] * count;
    }
  });
  return Math.abs(x) + Math.abs(y);
}

export function part2(lines: string[]) {
  let x = 0,
    y = 0,
    waypointX = 10,
    waypointY = -1;
  lines.forEach((line) => {
    const [, action, countStr] = line.match(/([FNESWLR])(\d+)/);
    const count = Number(countStr);
    if (action === 'L' || action === 'R') {
      for (let i = 0; i < count / 90; i++) {
        [waypointX, waypointY] = rotateCoordinate(waypointX, waypointY, action);
      }
    } else if (action === 'N') {
      waypointY -= count;
    } else if (action === 'S') {
      waypointY += count;
    } else if (action === 'W') {
      waypointX -= count;
    } else if (action === 'E') {
      waypointX += count;
    } else if (action === 'F') {
      x += waypointX * count;
      y += waypointY * count;
    }
  });
  return Math.abs(x) + Math.abs(y);
}
