import { cache } from '../../../utils/CacheUtil';
import { sumReducer } from '../../../utils/ReducerUtil';

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

const directionPadPositions = {
  '^': [1, 0],
  A: [2, 0],
  '<': [0, 1],
  v: [1, 1],
  '>': [2, 1],
};

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

const DIRS = {
  '>': [1, 0],
  v: [0, 1],
  '<': [-1, 0],
  '^': [0, -1],
};

function checkMove(start, end, avoid) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  let str = '';
  if (dx < 0) str += new Array(Math.abs(dx)).fill('<').join('');
  else str += new Array(dx).fill('>').join('');
  if (dy < 0) str += new Array(Math.abs(dy)).fill('^').join('');
  else str += new Array(dy).fill('v').join('');

  const moves = [...getPermutations(str.split(''))]
    .filter((p) => {
      let [x, y] = [...start];
      return (
        p.split('').findIndex((c) => {
          x += DIRS[c][0];
          y += DIRS[c][1];
          if (x === avoid[0] && y === avoid[1]) {
            return true;
          }
        }) === -1
      );
    })
    .map((p) => p + 'A');
  if (moves.length) return moves;
  return ['A'];
}

const minLength = cache((code: string, lim = 2, depth: number = 0) => {
  const avoid = depth === 0 ? [0, 3] : [0, 0];
  let cur = [...(depth === 0 ? keyPadPositions.A : directionPadPositions.A)];
  let length = 0;
  [...code].forEach((char) => {
    const next = (depth === 0 ? keyPadPositions : directionPadPositions)[char];
    const moveSet = checkMove(cur, next, avoid);
    if (depth === lim) length += moveSet[0].length;
    else {
      let min = -1;
      moveSet.forEach((move) => {
        const len = minLength(move, lim, depth + 1);
        if (min === -1 || len < min) min = len;
      });
      length += min;
    }
    cur = [...next];
  });
  return length;
});

export function part1(lines: string[]) {
  return lines
    .map((line) => {
      const len = minLength(line);
      return len * Number(line.match(/\d+/));
    })
    .reduce(sumReducer);
}

export function part2(lines: string[]) {
  return lines
    .map((line) => {
      const len = minLength(line, 25);
      return len * Number(line.match(/\d+/));
    })
    .reduce(sumReducer);
}
