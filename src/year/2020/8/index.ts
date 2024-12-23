const instructions = {
  nop: (acc: number, index: number, value: number) => [acc, 1],
  acc: (acc: number, index: number, value: number) => [acc + value, 1],
  jmp: (acc: number, index: number, value: number) => [acc, value],
};

export function part1(lines: string[]) {
  let acc = 0;
  let ptr = 0;
  const visited = new Set<number>();
  while (!visited.has(ptr)) {
    visited.add(ptr);
    const [op, arg] = lines[ptr].split(' ');
    const num = Number(arg);
    const [newAcc, jump] = instructions[op](acc, ptr, num);
    ptr += jump;
    acc = newAcc;
    if (ptr >= lines.length) return 'SUCCESS ' + acc;
  }
  return acc.toString();
}

export function part2(lines: string[]) {
  const nopIndexes = [];
  const jmpIndexes = [];
  for (let i = 0; i < lines.length; i++) {
    const [op] = lines[i].split(' ');
    if (op === 'nop') nopIndexes.push(i);
    if (op === 'jmp') jmpIndexes.push(i);
  }
  let finalAcc = '0';
  nopIndexes.forEach((index) => {
    const newLines = [...lines];
    newLines[index] = newLines[index].replace('nop', 'jmp');
    const result = part1(newLines);
    if (result.startsWith('S')) finalAcc = result;
  });
  jmpIndexes.forEach((index) => {
    const newLines = [...lines];
    newLines[index] = newLines[index].replace('jmp', 'nop');
    const result = part1(newLines);
    if (result.startsWith('S')) finalAcc = result;
  });
  return finalAcc;
}
