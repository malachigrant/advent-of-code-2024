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
    // console.log(lightLayout);
    // console.log(buttons);
    let fewestPressed = Infinity;
    console.log(line);
    for (let i = 0; i < Math.pow(2, buttons.length); i++) {
      const binary = i.toString(2).padStart(buttons.length, '0');
      //   console.log(binary);
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
        console.log(`Found solution: ${binary}`);
        fewestPressed = buttonCount;
      }
    }
    sum += fewestPressed;
  });
  return sum;
}

export async function part2(lines: string[]) {
  let sum = 0;
  lines.forEach(async (line) => {
    const parts = line.split(' ');
    const lightLayout =
      parts[0]
        .match(/[.#]+/)[0]
        .split('')
        .map((char) => (char === '.' ? 0 : 1)) || [];

    const buttons = parts.splice(1, parts.length - 2).map((btn) => {
      return btn.match(/\d+/g).map(Number);
    });

    const joltage = parts[parts.length - 1].match(/\d+/g).map(Number);
    console.log(lightLayout);
    console.log(buttons);
    console.log(joltage);

    const { Context } = await init();
    const Z3 = Context('main');
    const { Int, Sum } = Z3;

    const values = [];
    let sumEq = Int.val(0);
    buttons.forEach((btn, index) => {
      values[index] = Int.const(`b${index}`);
      sumEq = sumEq.add(values[index]);
    });
    const equations = [];
    joltage.forEach((jolts, i) => {
      const terms = [];
      buttons.forEach((btn, j) => {
        if (btn.includes(i)) {
          terms.push(values[j]);
        }
      });
      equations.push(
        terms.reduce((prev, curr) => prev.add(curr), Int.val(0)).eq(joltage[i]),
      );
    });
    const optimizer = new Z3.Optimize();
    optimizer.minimize(sumEq);
    equations.forEach((eq) => optimizer.add(eq));
    values.forEach((v) => optimizer.add(Int.val(0).le(v)));
    const status = await optimizer.check();
    console.log(`Status: ${status}`);
    const model = optimizer.model();
    let totalPressed = 0;
    values.forEach((v) => {
      const val = model.eval(v, true);
      totalPressed += parseInt(val.toString());
    });
    console.log(`Total pressed: ${totalPressed}`);
    sum += totalPressed;
    console.log(sum);
  });

  return sum;
}
