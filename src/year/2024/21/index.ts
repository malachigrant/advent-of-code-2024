import { sumReducer } from '../../../utils/ReducerUtil';

const keypad = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [null, '0', 'A'],
];
const keyPadPositions = {
  7: [0, 0],
  8: [1, 0],
  9: [2, 0],
  4: [0, 1],
  5: [1, 1],
  6: [2, 1],
  1: [0, 2],
  2: [1, 2],
  3: [2, 2],
  0: [1, 3],
  A: [2, 3],
};

const directionPad = [
  [null, '^', 'A'],
  ['<', 'v', '>'],
];
const directionPadPositions = {
  '^': [1, 0],
  A: [2, 0],
  '<': [0, 1],
  v: [1, 1],
  '>': [2, 1],
};

function check(currentPosition, p) {
  const curr = [...currentPosition];
  return (
    [...p].findIndex((c) => {
      if (c === '>') curr[0]++;
      else if (c === '<') curr[0]--;
      else if (c === 'v') curr[1]++;
      else if (c === '^') curr[1]--;
      if (curr[0] === 0 && curr[1] === 3) return true;
      return false;
    }) === -1
  );
}

function getKeypadSequence(code) {
  console.log(code);
  const currentPosition = [2, 3];
  let sequences = new Set();
  sequences.add('');
  code.split('').map((char) => {
    const desiredPosition = keyPadPositions[char];

    const xDiff = desiredPosition[0] - currentPosition[0];
    const yDiff = desiredPosition[1] - currentPosition[1];

    const possibles = getPermutations([
      ...new Array(Math.abs(xDiff)).fill(xDiff > 0 ? '>' : '<'),
      ...new Array(Math.abs(yDiff)).fill(yDiff > 0 ? 'v' : '^').join(''),
    ]);
    if (possibles.size) {
      const newSequences = new Set<string>();
      sequences.forEach((s) => {
        possibles.forEach((p) => {
          if (!check(currentPosition, p)) return;
          newSequences.add(s + p + 'A');
        });
      });
      sequences = newSequences;
    } else {
      const newSequences = new Set<string>();
      sequences.forEach((s) => {
        newSequences.add(s + 'A');
      });
      sequences = newSequences;
    }
    // console.log(sequences, possibles);

    /* sequences.forEach((seq, i) => {
        const newSequences = new Set();
        newSequences.add(
          seq +
            new Array(Math.abs(xDiff)).fill(xDiff > 0 ? '>' : '<').join('') +
            new Array(Math.abs(yDiff)).fill(yDiff > 0 ? 'v' : '^').join(''),
        );
  
        newSequences.add(
          seq +
            new Array(Math.abs(yDiff)).fill(yDiff > 0 ? 'v' : '^').join('') +
            new Array(Math.abs(xDiff)).fill(xDiff > 0 ? '>' : '<').join(''),
        );
        sequences = newSequences;
      }); */
    currentPosition[0] = desiredPosition[0];
    currentPosition[1] = desiredPosition[1];

    /*while (
          currentPosition[0] !== desiredPosition[0] ||
          currentPosition[1] !== desiredPosition[1]
        ) {
          if (desiredPosition[1] > currentPosition[1]) {
            seq += 'v';
            currentPosition[1]++;
            continue;
          }
          if (desiredPosition[1] < currentPosition[1]) {
            seq += '^';
            currentPosition[1]--;
            continue;
          }
          if (desiredPosition[0] < currentPosition[0]) {
            seq += '<';
            currentPosition[0]--;
            continue;
          }
          if (desiredPosition[0] > currentPosition[0]) {
            seq += '>';
            currentPosition[0]++;
            continue;
          }
        }*/
  });
  return sequences;
}

function getPermutations(arr: string[]): Set<string> {
  if (arr.length === 1) {
    const s = new Set<string>();
    s.add(arr[0]);
    return s;
  }
  const perms = new Set<string>();
  arr.forEach((a, i) => {
    const newArr = [...arr];
    newArr.splice(i, 1);
    [...getPermutations(newArr)].map((p) => a + p).forEach((p) => perms.add(p));
  });
  return perms;
}

function check2(currentPosition, p) {
  const curr = [...currentPosition];
  return (
    [...p].findIndex((c) => {
      if (c === '>') curr[0]++;
      else if (c === '<') curr[0]--;
      else if (c === 'v') curr[1]++;
      else if (c === '^') curr[1]--;
      if (curr[0] === 0 && curr[1] === 0) return true;
      return false;
    }) === -1
  );
}

function getDirectionPadSequence(code) {
  console.log(code);
  const currentPosition = [2, 0];
  let sequences = new Set();
  sequences.add('');
  code.split('').map((char) => {
    const desiredPosition = directionPadPositions[char];

    const xDiff = desiredPosition[0] - currentPosition[0];
    const yDiff = desiredPosition[1] - currentPosition[1];

    const possibles = getPermutations([
      ...new Array(Math.abs(xDiff)).fill(xDiff > 0 ? '>' : '<'),
      ...new Array(Math.abs(yDiff)).fill(yDiff > 0 ? 'v' : '^').join(''),
    ]);
    if (possibles.size) {
      const newSequences = new Set<string>();
      sequences.forEach((s) => {
        possibles.forEach((p) => {
          if (!check2(currentPosition, p)) return;
          newSequences.add(s + p + 'A');
        });
      });
      sequences = newSequences;
    } else {
      const newSequences = new Set<string>();
      sequences.forEach((s) => {
        newSequences.add(s + 'A');
      });
      sequences = newSequences;
    }
    // console.log(sequences, possibles);

    /* sequences.forEach((seq, i) => {
      const newSequences = new Set();
      newSequences.add(
        seq +
          new Array(Math.abs(xDiff)).fill(xDiff > 0 ? '>' : '<').join('') +
          new Array(Math.abs(yDiff)).fill(yDiff > 0 ? 'v' : '^').join(''),
      );

      newSequences.add(
        seq +
          new Array(Math.abs(yDiff)).fill(yDiff > 0 ? 'v' : '^').join('') +
          new Array(Math.abs(xDiff)).fill(xDiff > 0 ? '>' : '<').join(''),
      );
      sequences = newSequences;
    }); */
    currentPosition[0] = desiredPosition[0];
    currentPosition[1] = desiredPosition[1];

    /*while (
        currentPosition[0] !== desiredPosition[0] ||
        currentPosition[1] !== desiredPosition[1]
      ) {
        if (desiredPosition[1] > currentPosition[1]) {
          seq += 'v';
          currentPosition[1]++;
          continue;
        }
        if (desiredPosition[1] < currentPosition[1]) {
          seq += '^';
          currentPosition[1]--;
          continue;
        }
        if (desiredPosition[0] < currentPosition[0]) {
          seq += '<';
          currentPosition[0]--;
          continue;
        }
        if (desiredPosition[0] > currentPosition[0]) {
          seq += '>';
          currentPosition[0]++;
          continue;
        }
      }*/
  });
  return sequences;
}

export function part1(lines: string[]) {
  console.log(getPermutations(['a', 'b', 'c']));
  return lines
    .map((line) => {
      const keypadSequences = getKeypadSequence(line);
      const directionSequences1 = new Set<string>();
      keypadSequences.forEach((seq) => {
        const seqs = getDirectionPadSequence(seq);
        seqs.forEach((x) => directionSequences1.add(x));
      });

      const directionSequences2 = new Set<string>();
      directionSequences1.forEach((seq) => {
        const seqs = getDirectionPadSequence(seq);
        seqs.forEach((x) => directionSequences2.add(x));
      });
      console.log(line, directionSequences2);

      let shortest = '';
      directionSequences2.forEach((seq) => {
        if (shortest === '' || seq.length < shortest.length) shortest = seq;
      });
      const num = Number(line.match(/\d+/));
      console.log(num, shortest);
      return shortest.length * num;
    })
    .reduce(sumReducer);
  // not 189174
}

export function part2(lines: string[]) {
  return 0;
}
