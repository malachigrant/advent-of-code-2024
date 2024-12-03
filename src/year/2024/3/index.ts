export function part1(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    const mults = [...line.matchAll(/mul\(\d+,\d+\)/gm)];
    mults.forEach((mult) => {
      let [, x, y] = mult.toString().match(/(\d+),(\d+)/);
      sum += Number(x) * Number(y);
    });
  });
  return sum;
}

export function part2(lines: string[]) {
  let sum = 0;
  let enabled = true;
  lines.forEach((line) => {
    const actions = [...line.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/gm)];
    actions.forEach((action) => {
      const strAct = action.toString();
      if (strAct.startsWith("don't")) {
        enabled = false;
        return;
      } else if (strAct.startsWith('do')) {
        enabled = true;
        return;
      } else {
        if (!enabled) {
          return;
        }
        let [, x, y] = strAct.match(/(\d+),(\d+)/);
        sum += Number(x) * Number(y);
      }
    });
  });
  return sum;
}
