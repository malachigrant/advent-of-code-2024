import { sumReducer } from '../../../utils/ReducerUtil';
import { init } from 'z3-solver';

export function part1(lines: string[]) {
  let sum = 0;
  lines.forEach((line) => {
    const parts = line.split(' ');
    const lightLayout =
      parts[0]
        .match(/[.#]+/)[0]
        .split('')
        .map((char) => (char === '.' ? 0 : 1)) || [];

    const buttons = parts.splice(1, parts.length - 2).map((btn) => {
      return btn.match(/\d+/g).map(Number);
    });
    let fewestPressed = Infinity;
    for (let i = 0; i < Math.pow(2, buttons.length); i++) {
      const binary = i.toString(2).padStart(buttons.length, '0');
      const buttonCount = [...binary].filter((b) => b === '1').length;
      if (buttonCount >= fewestPressed) {
        continue;
      }
      const currentLightLayout = lightLayout.map(() => 0);
      [...binary].forEach((bit, index) => {
        if (bit === '1') {
          buttons[index].forEach((pos) => {
            currentLightLayout[pos] = currentLightLayout[pos] ? 0 : 1;
          });
        }
      });
      if (currentLightLayout.join('') === lightLayout.join('')) {
        fewestPressed = buttonCount;
      }
    }
    sum += fewestPressed;
  });
  return sum;
}

export async function part2(lines: string[]) {
  const promises = lines.map(
    (line) =>
      new Promise(async (resolve) => {
        const parts = line.split(' ');

        const buttons = parts.splice(1, parts.length - 2).map((btn) => {
          return btn.match(/\d+/g).map(Number);
        });

        const joltage = parts[parts.length - 1].match(/\d+/g).map(Number);

        const { Context } = await init();
        const Z3 = Context('main');
        const { Int } = Z3;

        const values = [];
        let sumEq = Int.val(0);
        buttons.forEach((_, index) => {
          values[index] = Int.const(`b${index}`);
          sumEq = sumEq.add(values[index]);
        });
        const equations = [];
        joltage.forEach((_, i) => {
          const terms = [];
          buttons.forEach((btn, j) => {
            if (btn.includes(i)) {
              terms.push(values[j]);
            }
          });
          equations.push(
            terms
              .reduce((prev, curr) => prev.add(curr), Int.val(0))
              .eq(joltage[i]),
          );
        });
        const optimizer = new Z3.Optimize();
        optimizer.minimize(sumEq);
        equations.forEach((eq) => optimizer.add(eq));
        values.forEach((v) => optimizer.add(Int.val(0).le(v)));
        await optimizer.check();
        const model = optimizer.model();
        let totalPressed = 0;
        values.forEach((v) => {
          const val = model.eval(v, true);
          totalPressed += parseInt(val.toString());
        });
        resolve(totalPressed);
      }),
  );

  return (await Promise.all(promises)).reduce(sumReducer);
}
