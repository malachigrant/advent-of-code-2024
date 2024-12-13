export function part1(lines: string[]) {
  const machines = lines.join('\n').split('\n\n');
  let sum = 0;
  machines.forEach((machine) => {
    const [a, b, prize] = machine.split('\n');
    const [, axs, ays] = a.match(/Button A: X\+(\d+), Y\+(\d+)/);
    const [, bxs, bys] = b.match(/Button B: X\+(\d+), Y\+(\d+)/);
    const [, pxs, pys] = prize.match(/Prize: X=(\d+), Y=(\d+)/);
    const [ax, ay, bx, by, px, py] = [axs, ays, bxs, bys, pxs, pys].map(Number);

    const eq1 = { slope: -ax / bx, offset: px / bx };
    const eq2 = { slope: -ay / by, offset: py / by };

    const [xInt, yInt] = intersects(eq1, eq2);

    if (
      (xInt % 1 < 0.001 || xInt % 1 > 0.999) &&
      (yInt % 1 < 0.001 || yInt % 1 > 0.999)
    ) {
      sum += Math.floor(xInt + 0.5) * 3 + Math.floor(yInt + 0.5);
    }
  });
  return sum;
}

interface Equation {
  slope: number;
  offset: number;
}

function intersects(e1: Equation, e2: Equation) {
  const a1 = e1.slope;
  const a2 = e2.slope;
  const b1 = -1;
  const b2 = -1;
  const c1 = e1.offset;
  const c2 = e2.offset;

  const intersectX = (b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1);
  const intersectY = (c1 * a2 - c2 * a1) / (a1 * b2 - a2 * b1);
  return [intersectX, intersectY];
}

export function part2(lines: string[]) {
  const machines = lines.join('\n').split('\n\n');
  let sum = 0;
  machines.forEach((machine) => {
    const [a, b, prize] = machine.split('\n');
    const [, axs, ays] = a.match(/Button A: X\+(\d+), Y\+(\d+)/);
    const [, bxs, bys] = b.match(/Button B: X\+(\d+), Y\+(\d+)/);
    const [, pxs, pys] = prize.match(/Prize: X=(\d+), Y=(\d+)/);
    let [ax, ay, bx, by, px, py] = [axs, ays, bxs, bys, pxs, pys].map(Number);
    px += 10000000000000;
    py += 10000000000000;

    const eq1 = { slope: -ax / bx, offset: px / bx };
    const eq2 = { slope: -ay / by, offset: py / by };

    const [xInt, yInt] = intersects(eq1, eq2);

    if (
      (xInt % 1 < 0.001 || xInt % 1 > 0.999) &&
      (yInt % 1 < 0.001 || yInt % 1 > 0.999)
    ) {
      sum += Math.floor(xInt + 0.5) * 3 + Math.floor(yInt + 0.5);
    }
  });
  return sum;
}
