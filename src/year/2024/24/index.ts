import { check } from 'prettier';

const fns = {
  OR: (a, b) => (a + b > 0 ? 1 : 0),
  AND: (a, b) => (a * b > 0 ? 1 : 0),
  XOR: (a, b) => (a != b ? 1 : 0),
};

export function part1(lines: string[]) {
  const [initial, rules] = lines.join('\n').split('\n\n');
  const states = {};
  initial.split('\n').forEach((line) => {
    const [, label, valStr] = line.match(/(\w+): (\d)/);
    states[label] = Number(valStr);
  });
  const ruleArr = [];
  rules.split('\n').forEach((line) => {
    const [, first, op, second, result] = line.match(
      /(\w+) (XOR|OR|AND) (\w+) -> (\w+)/,
    );
    ruleArr.push([first, op, second, result]);
  });
  while (true) {
    let missed = false;
    ruleArr.forEach(([first, op, second, result]) => {
      const a = states[first];
      const b = states[second];
      if (a === undefined || b === undefined) {
        missed = true;
        return;
      }
      states[result] = fns[op](a, b);
    });
    if (!missed) break;
  }
  let finalStr = '';
  for (let i = 0; ; i++) {
    let label = 'z';
    if (i < 10) {
      label += '0';
    }
    label += i;
    if (states[label] === undefined) {
      break;
    }
    finalStr = states[label] + finalStr;
  }
  console.log(states);
  console.log(finalStr, parseInt(finalStr, 2));
  console.log(parseInt(calc(states, ruleArr), 2));
  return 0;
}

function calc(staticStates, ruleArr, outputSwaps = {}, xs?, ys?) {
  const states = { ...staticStates };
  while (true) {
    let missed = false;
    let changed = false;
    ruleArr.forEach(([first, op, second, result], i) => {
      let a = states[first];
      let b = states[second];
      if (first.startsWith('x') && xs) {
        a = xs[parseInt(first.slice(1))];
      }
      if (first.startsWith('y') && ys) {
        a = ys[parseInt(first.slice(1))];
      }
      if (second.startsWith('x') && xs) {
        b = xs[parseInt(second.slice(1))];
      }
      if (second.startsWith('y') && ys) {
        b = ys[parseInt(second.slice(1))];
      }
      let output = result;
      if (outputSwaps[result] !== undefined) {
        output = outputSwaps[result];
      }
      if (a === undefined || b === undefined) {
        missed = true;
        return;
      }
      const val = fns[op](a, b);
      if (states[output] !== val) {
        changed = true;
      }
      states[output] = fns[op](a, b);
    });
    if (!changed) break;
    if (!missed) break;
  }
  let finalStr = '';
  for (let i = 0; ; i++) {
    let label = 'z';
    if (i < 10) {
      label += '0';
    }
    label += i;
    if (states[label] === undefined) {
      break;
    }
    finalStr = states[label] + finalStr;
  }
  return finalStr;
}

function findDiffs(a, b) {
  const flipped = [];
  [...a].forEach((x, i) => {
    if (x !== b[i]) {
      const zIndex = a.length - i - 1;
      flipped.push(`z${zIndex < 10 ? '0' : ''}${zIndex}`);
    }
  });
  return flipped;
}

// function checkSwaps(checkArr, states, ruleArr, desiredFinal) {
//   const outputSwaps = {};

//   //   while (Object.values(outputSwaps).length < 8) {
//   for (let i = 0; i < checkArr.length; i++) {
//     for (let j = i + 1; j < checkArr.length; j++) {
//       if (outputSwaps[i] !== undefined || outputSwaps[j] !== undefined)
//         continue;
//       // console.log(i, j);
//       const result = calc(states, ruleArr, {
//         ...outputSwaps,
//         [i]: j,
//         [j]: i,
//       });
//       if (result === undefined) continue;
//       const diffs = findDiffs(desiredFinal, result);
//       if (diffs.length < minDiffs) {
//         minDiffs = diffs.length;
//         //   outputSwaps[i] = j;
//         //   outputSwaps[j] = i;
//         console.log(minDiffs, outputSwaps, i, j);
//         //   break;
//       }
//     }
//   }
//   //   }
// }

function seeAncestors(ruleArr, nodes) {
  const potentialAncestors = new Set<string>();
  const queue = [...nodes];
  while (queue.length) {
    const output = queue.shift();
    ruleArr.forEach((rule, j) => {
      if (potentialAncestors.has(j)) return;
      if (rule[3] === output) {
        potentialAncestors.add(rule[3]);
        queue.push(rule[0]);
        queue.push(rule[2]);
      }
    });
  }
  return potentialAncestors;
}

export function part2(lines: string[]) {
  const [wiresRaw, gatesRaw] = lines
    .join('\n')
    .split('\n\n')
    .map((n) => n.split('\n'));

  const wires = {};
  for (const line of wiresRaw) {
    const [name, value] = line.split(': ');
    wires[name] = parseInt(value);
  }

  const inputBitCount = wiresRaw.length / 2;

  const gates = [];
  for (const line of gatesRaw) {
    let [inputs, output] = line.split(' -> ');

    const [a, op, b] = inputs.split(' ');
    gates.push({ a, op, b, output });

    if (wires[a] == undefined) wires[a] = null;
    if (wires[b] == undefined) wires[b] = null;
    if (wires[output] == undefined) wires[output] = null;
  }

  function isDirect(gate) {
    return gate.a.indexOf('x') == 0 || gate.b.indexOf('x') == 0;
  }

  function isOutput(gate) {
    return gate.output.indexOf('z') == 0;
  }

  function isGate(type) {
    return function (gate) {
      return gate.op == type;
    };
  }

  function hasOutput(output) {
    return function (gate) {
      return gate.output === output;
    };
  }

  function hasInput(input) {
    return function (gate) {
      return gate.a === input || gate.b === input;
    };
  }

  //outputs that are flagged as bad or suspicious
  const flags = new Set();

  /**
   * FULL ADDER
   * (first bits aren't a full adder)
   * (for last FA, COUT is the extra output)
   *
   * A    XOR B    -> VAL0     <= FAGate0
   * A    AND B    -> VAL1     <= FAGate1
   * VAL0 AND CIN  -> VAL2     <= FAGate2
   * VAL0 XOR CIN  -> SUM      <= FAGate3
   * VAL1 OR  VAL2 -> COUT     <= FAGate4
   */

  //check FAGate0 gates for zXXs
  //each of these should be a An XOR Bn -> VAL0n
  //except for the first one, which should be x00 XOR y00 -> z00
  const FAGate0s = gates.filter(isDirect).filter(isGate('XOR'));
  for (const gate of FAGate0s) {
    const { a, b, output } = gate;

    const isFirst = a === 'x00' || b === 'x00';
    if (isFirst) {
      if (output !== 'z00') {
        flags.add(output);
      }
      continue;
    } else if (output == 'z00') {
      flags.add(output);
    }

    //none of these should be a output
    if (isOutput(gate)) {
      flags.add(output);
    }
  }

  //check all XOR gates that are indirect (FAGate3)
  //each of these should be outputting to a zXX
  const FAGate3s = gates
    .filter(isGate('XOR'))
    .filter((gate) => !isDirect(gate));
  for (const gate of FAGate3s) {
    if (!isOutput(gate)) {
      flags.add(gate.output);
    }
  }

  //check all output gates
  //each of these should be VAL0 XOR CIN -> SUM
  //except for the last one, which should be VAL1 OR VAL2 -> COUT
  const outputGates = gates.filter(isOutput);
  for (const gate of outputGates) {
    const isLast = gate.output === `z${inputBitCount}`.padStart(3, '0');
    if (isLast) {
      if (gate.op !== 'OR') {
        flags.add(gate.output);
      }
      continue;
    } else if (gate.op !== 'XOR') {
      flags.add(gate.output);
    }
  }

  //more complex checks

  //all FAGate0 gates MUST output to a FAGate3 gate
  let checkNext = [];
  for (const gate of FAGate0s) {
    const { output } = gate;

    //if we've already flagged this, skip
    if (flags.has(output)) continue;

    //if the output is z00, skip
    if (output === 'z00') continue;

    const matches = FAGate3s.filter(hasInput(output));
    if (matches.length === 0) {
      checkNext.push(gate);
      flags.add(output);
    }
  }

  //check what the flagged gates should be
  for (const gate of checkNext) {
    const { a, output } = gate;

    //the inputs should be An and Bn, so the output of this gate *should* go to an FaGate3 that outputs Zn
    const intendedResult = `z${a.slice(1)}`;
    const matches = FAGate3s.filter(hasOutput(intendedResult));

    //if there's not exactly one match, something has gone very wrong
    if (matches.length != 1) {
      throw new Error('Critical Error! Is your input correct?');
    }

    const match = matches[0];

    const toCheck = [match.a, match.b];

    //one of these should come from an OR gate
    const orMatches = gates
      .filter(isGate('OR'))
      .filter((gate) => toCheck.includes(gate.output));

    //if theres not exactly one match, this solver isn't complex enough to solve this
    if (orMatches.length != 1) {
      throw new Error(
        "Critical Error! This solver isn't complex enough to solve this",
      );
    }

    const orMatchOutput = orMatches[0].output;

    //the correct output is the one that isn't OrMatchOutput
    const correctOutput = toCheck.find((output) => output !== orMatchOutput);
    flags.add(correctOutput);
  }

  //if there isn't exactly 8 flags, this solver isn't complex enough to solve this
  if (flags.size != 8) {
    throw new Error(
      "Critical Error! This solver isn't complex enough to solve this",
    );
  }

  const flagsArr = [...flags];
  flagsArr.sort((a, b) => a.localeCompare(b));
  console.log(flagsArr.join(','));

  return 0;
  const [initial, rules] = lines.join('\n').split('\n\n');
  const states = {};
  initial.split('\n').forEach((line) => {
    const [, label, valStr] = line.match(/(\w+): (\d)/);
    states[label] = Number(valStr);
  });

  const ruleArr = [];
  rules.split('\n').forEach((line) => {
    const [, first, op, second, result] = line.match(
      /(\w+) (XOR|OR|AND) (\w+) -> (\w+)/,
    );
    ruleArr.push([first, op, second, result]);
  });

  let desiredFinalStrX = '';
  for (let i = 0; ; i++) {
    let label = 'x';
    if (i < 10) {
      label += '0';
    }
    label += i;
    if (states[label] === undefined) {
      break;
    }
    desiredFinalStrX = states[label] + desiredFinalStrX;
  }
  let desiredFinalStrY = '';
  for (let i = 0; ; i++) {
    let label = 'y';
    if (i < 10) {
      label += '0';
    }
    label += i;
    if (states[label] === undefined) {
      break;
    }
    desiredFinalStrY = states[label] + desiredFinalStrY;
  }
  const desiredFinal = (
    parseInt(desiredFinalStrX, 2) + parseInt(desiredFinalStrY, 2)
  ).toString(2);
  //   console.log(desiredFinalStrX, desiredFinalStrY);
  // z11, z06, z31
  //   console.log(desiredFinal);
  //   console.log(actual);
  //   const flipped = findDiffs(desiredFinal, actual);
  //   console.log(flipped);

  function reflectObj(obj) {
    const newObj = {};
    Object.entries(obj).forEach(([key, val]) => {
      newObj[val] = key;
      newObj[key] = val;
    });
    return newObj;
  }
  let worked = {};
  for (let i = 0; i < 45; i++) {
    const xs = new Array(45)
      .fill(1)
      .map((_, j) => (Math.random() > 0.5 ? 1 : 0));
    const ys = new Array(45)
      .fill(1)
      .map((_, j) => (Math.random() > 0.5 ? 1 : 0));
    const expectedTrimmed = (
      parseInt(xs.join(''), 2) + parseInt(ys.join(''), 2)
    ).toString(2);
    const actual = calc(states, ruleArr, {}, xs, ys);
    const expected = // desiredFinal;
      new Array(actual.length - expectedTrimmed.length).fill('0').join('') +
      expectedTrimmed;
    const flipped = findDiffs(expected, actual);
    const allAncestors = seeAncestors(ruleArr, flipped);
    const check = [...allAncestors];
    let minDiff = 100;
    if (Object.values(worked).length) {
      const newWorked = {};
      Object.keys(worked).forEach((x) => {
        const [check1, check2] = x.split(',');
        const result = calc(
          states,
          ruleArr,
          reflectObj({
            [check1]: check2,
          }),
          xs,
          ys,
        );
        if (!result) return;
        const diffs = findDiffs(result, expected);
        minDiff = Math.min(minDiff, diffs.length);
        if (diffs.length === 6) {
          newWorked[`${check1},${check2}`] = 1;
          console.log(diffs, check1, check2);
        }
      });
      worked = newWorked;
      console.log(worked);
      continue;
    } else {
      if (i) return 'Borked';
      for (let i = 0; i < allAncestors.size; i++) {
        console.log(i);

        for (let j = 0; j < ruleArr.length; j++) {
          const check2 = ruleArr[j][3];
          if (check2 === check[i]) continue;
          const result = calc(
            states,
            ruleArr,
            reflectObj({
              [check[i]]: check2,
            }),
            xs,
            ys,
          );
          if (!result) continue;
          const diffs = findDiffs(result, expected);
          minDiff = Math.min(minDiff, diffs.length);
          if (diffs.length === 6) {
            worked[`${check[i]},${check2}`] = 1;
            console.log(diffs, check[i], check2);
          }
        }
      }
    }
    console.log(worked);
    // console.log(flipped);
    // console.log(expected.length);
    // console.log(expected);
    // console.log(actual);
  }
  return 0;

  const allAncestors = seeAncestors(ruleArr, flipped);
  console.log(allAncestors);
  const check = [...allAncestors];
  for (let i = 0; i < allAncestors.size; i++) {
    for (let j = i + 1; j < allAncestors.size; j++) {
      const result = calc(
        states,
        ruleArr,
        {
          [check[i]]: check[j],
          [check[j]]: check[i],
        },
        xs,
        ys,
      );
      if (!result) continue;
      const diffs = findDiffs(result, expected);
      if (diffs.length === 6) {
        console.log(diffs, check[i], check[j]);
      }
    }
  }

  flipped.forEach((x, i) => {
    // console.log(x, i);
    // console.log(seeAncestors(ruleArr, [x]));
  });
  // z31

  //   for (let i = 0; i < checkArr.length; i++) {
  //     for (let j = i + 1; j < checkArr.length; j++) {
  //       for (let k = 0; k < checkArr.length; k++) {
  //         for (let l = k + 1; l < checkArr.length; l++) {
  //           for (let m = 0; m < checkArr.length; m++) {
  //             for (let n = m + 1; n < checkArr.length; n++) {
  //               for (let o = 0; o < checkArr.length; o++) {
  //                 for (let p = o + 1; p < checkArr.length; p++) {
  //                   if (
  //                     i === j ||
  //                     i === k ||
  //                     i === l ||
  //                     i === m ||
  //                     i === n ||
  //                     i === o ||
  //                     i === p ||
  //                     j === k ||
  //                     j === l ||
  //                     j === m ||
  //                     j === n ||
  //                     j === o ||
  //                     j === p ||
  //                     k === l ||
  //                     k === m ||
  //                     k === n ||
  //                     k === o ||
  //                     k === p ||
  //                     l === m ||
  //                     l === n ||
  //                     l === o ||
  //                     l === p ||
  //                     m === n ||
  //                     m === o ||
  //                     m === p ||
  //                     n === o ||
  //                     n === p ||
  //                     o === p
  //                   )
  //                     continue;
  //                   const newRuleArr = ruleArr.map((x) => [...x]);
  //                   newRuleArr[checkArr[i]][3] = ruleArr[checkArr[j]][3];
  //                   newRuleArr[checkArr[j]][3] = ruleArr[checkArr[i]][3];
  //                   newRuleArr[checkArr[k]][3] = ruleArr[checkArr[l]][3];
  //                   newRuleArr[checkArr[l]][3] = ruleArr[checkArr[k]][3];
  //                   newRuleArr[checkArr[m]][3] = ruleArr[checkArr[n]][3];
  //                   newRuleArr[checkArr[n]][3] = ruleArr[checkArr[m]][3];
  //                   newRuleArr[checkArr[o]][3] = ruleArr[checkArr[p]][3];
  //                   newRuleArr[checkArr[p]][3] = ruleArr[checkArr[o]][3];
  //                   const res = calc(states, newRuleArr);
  //                   //   console.log(res, i, j, k, l);
  //                   if (res === desiredFinal) {
  //                     console.log(
  //                       ruleArr[checkArr[i]],
  //                       ruleArr[checkArr[j]],
  //                       ruleArr[checkArr[k]],
  //                       ruleArr[checkArr[l]],
  //                     );
  //                     return [
  //                       ruleArr[checkArr[i]][3],
  //                       ruleArr[checkArr[j]][3],
  //                       ruleArr[checkArr[k]][3],
  //                       ruleArr[checkArr[l]][3],
  //                     ]
  //                       .sort()
  //                       .join(',');
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
}
