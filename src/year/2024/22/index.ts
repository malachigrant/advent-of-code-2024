import { sumReducer } from '../../../utils/ReducerUtil';

function next(num) {
  let secret = num;
  secret = prune(mix(num * 64, secret));
  secret = prune(mix(Math.floor(secret / 32), secret));
  secret = prune(mix(secret * 2048, secret));
  return secret;
}

function mix(num, secret) {
  return (num ^ secret) >>> 0;
}

function prune(num) {
  return num % 16777216;
}

export function part1(lines: string[]) {
  return lines
    .map((line) => {
      let num = Number(line);
      for (let i = 0; i < 2000; i++) {
        num = next(num);
      }
      return num;
    })
    .reduce(sumReducer);
}

type Sequences = Record<string, { price: number; i: number }>;

export function part2(lines: string[]) {
  const sequences: Sequences = {};
  function addToSequences(seq: number[], price: number, i: number) {
    const key = seq.join(',');
    if (!sequences[key]) {
      sequences[key] = { price, i };
    } else if (sequences[key].i < i) {
      sequences[key].price += price;
      sequences[key].i = i;
    }
  }
  lines.forEach((line, j) => {
    let num = Number(line);
    let seq = [];
    for (let i = 0; i < 2000; i++) {
      const prevPrice = num % 10;
      num = next(num);
      const newPrice = num % 10;
      seq.push(newPrice - prevPrice);
      if (seq.length === 4) {
        addToSequences(seq, newPrice, j);
        seq.shift();
      }
    }
  });
  return Object.values(sequences)
    .map(({ price }) => price)
    .reduce((acc, curr) => (acc === -1 ? curr : Math.max(acc, curr)), -1);
}
