import { Grid } from '../../../utils/Grid';
import { getLoopingNum } from '../../../utils/NumberUtil';

export function part1(lines: string[], testMode: boolean) {
  const WIDTH = testMode ? 11 : 101;
  const HEIGHT = testMode ? 7 : 103;
  const robots = [];
  lines.forEach((line) => {
    const match = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/);
    const [, px, py, vx, vy] = match;
    const [posX, posY, velX, velY] = [px, py, vx, vy].map(Number);
    robots.push({ posX, posY, velX, velY });
  });
  for (let i = 0; i < 100; i++) {
    robots.forEach((robot) => {
      robot.posX += robot.velX;
      if (robot.posX >= WIDTH) robot.posX -= WIDTH;
      if (robot.posX < 0) robot.posX += WIDTH;
      robot.posY += robot.velY;
      if (robot.posY >= HEIGHT) robot.posY -= HEIGHT;
      if (robot.posY < 0) robot.posY += HEIGHT;
    });
  }
  let q1 = 0,
    q2 = 0,
    q3 = 0,
    q4 = 0;
  robots.forEach((robot) => {
    // robot.posX = getLoopingNum(robot.posX, 0, WIDTH);
    // robot.posY = getLoopingNum(robot.posY, 0, HEIGHT);
    if (robot.posX < WIDTH / 2 - 1 && robot.posY < HEIGHT / 2 - 1) {
      q1++;
    } else if (robot.posX < WIDTH / 2 - 1 && robot.posY > HEIGHT / 2) {
      q2++;
    } else if (robot.posX > WIDTH / 2 && robot.posY < HEIGHT / 2 - 1) {
      q3++;
    } else if (robot.posX > WIDTH / 2 && robot.posY > HEIGHT / 2) {
      q4++;
    }
  });
  return q1 * q2 * q3 * q4;
}

export function part2(lines: string[], testMode: boolean) {
  if (testMode) return 'N/A';
  const WIDTH = 101;
  const HEIGHT = 103;
  const robots = [];
  lines.forEach((line) => {
    const match = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/);
    const [, px, py, vx, vy] = match;
    const [posX, posY, velX, velY] = [px, py, vx, vy].map(Number);
    robots.push({ posX, posY, velX, velY });
  });

  for (let i = 0; i < 10000; i++) {
    const grid = Grid.of(WIDTH, HEIGHT, ' ');
    let allUnique = true;
    robots.forEach((robot) => {
      robot.posX += robot.velX;
      if (robot.posX >= WIDTH) robot.posX -= WIDTH;
      if (robot.posX < 0) robot.posX += WIDTH;
      robot.posY += robot.velY;
      if (robot.posY >= HEIGHT) robot.posY -= HEIGHT;
      if (robot.posY < 0) robot.posY += HEIGHT;
      if (grid.get(robot.posX, robot.posY) === '#') allUnique = false;
      grid.set(robot.posX, robot.posY, '#');
    });
    if (allUnique) {
      return i + 1;
    }
  }
}
