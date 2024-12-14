import chalk from 'chalk';
import { Grid } from '../../../utils/Grid';
import { getLoopingNum } from '../../../utils/NumberUtil';

function getRobots(lines: string[]) {
  const robots = [];
  lines.forEach((line) => {
    const match = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/);
    const [, px, py, vx, vy] = match;
    const [posX, posY, velX, velY] = [px, py, vx, vy].map(Number);
    robots.push({ posX, posY, velX, velY });
  });
  return robots;
}

export function part1(lines: string[], testMode: boolean) {
  const WIDTH = testMode ? 11 : 101;
  const HEIGHT = testMode ? 7 : 103;
  const robots = getRobots(lines);
  robots.forEach((robot) => {
    robot.posX = getLoopingNum(robot.posX + robot.velX * 100, 0, WIDTH);
    robot.posY = getLoopingNum(robot.posY + robot.velY * 100, 0, HEIGHT);
  });
  let q1 = 0,
    q2 = 0,
    q3 = 0,
    q4 = 0;
  robots.forEach((robot) => {
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

export function part2(lines: string[], testMode: boolean, visualize: boolean) {
  if (testMode) return 'N/A';
  const WIDTH = 101;
  const HEIGHT = 103;
  const robots = getRobots(lines);

  for (let i = 0; i < 10000; i++) {
    const robotPositions = new Set<number>();
    let allUnique = true;
    robots.forEach((robot) => {
      robot.posX = getLoopingNum(robot.posX + robot.velX, 0, WIDTH);
      robot.posY = getLoopingNum(robot.posY + robot.velY, 0, HEIGHT);
      const uniquePositionIndicator = robot.posX * 1000 + robot.posY;
      if (allUnique && robotPositions.has(uniquePositionIndicator))
        allUnique = false;
      robotPositions.add(uniquePositionIndicator);
    });
    if (allUnique) {
      if (visualize) {
        const grid = Grid.of(WIDTH, HEIGHT, ' ');
        robotPositions.forEach((pos) => {
          const x = Math.floor(pos / 1000);
          const y = pos % 1000;
          grid.set(x, y, chalk.green('█'));
        });
        grid.log();
      }
      return i + 1;
    }
  }
}
