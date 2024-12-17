function getCombo(regs, num) {
  if (num >= 0 && num <= 3) return num;
  if (num === 4) return regs.A;
  if (num === 5) return regs.B;
  if (num === 6) return regs.C;
}

const opFns = {
  [0]: (regs, op, p) => {
    regs.A = Math.floor(regs.A / Math.pow(2, getCombo(regs, op)));
    return p + 2;
  },
  [1]: (regs, op, p) => {
    regs.B = (regs.B ^ op) >>> 0;
    return p + 2;
  },
  [2]: (regs, op, p) => {
    regs.B = getCombo(regs, op) % 8;
    return p + 2;
  },
  [3]: (regs, op, p) => {
    if (regs.A !== 0) {
      return op;
    }
    return p + 2;
  },
  [4]: (regs, op, p) => {
    regs.B = (regs.B ^ regs.C) >>> 0;
    return p + 2;
  },
  [5]: (regs, op, p, outputFn) => {
    const val = getCombo(regs, op);
    outputFn(val % 8);
    return p + 2;
  },
  [6]: (regs, op, p) => {
    regs.B = Math.floor(regs.A / Math.pow(2, getCombo(regs, op)));
    return p + 2;
  },
  [7]: (regs, op, p) => {
    regs.C = Math.floor(regs.A / Math.pow(2, getCombo(regs, op)));
    return p + 2;
  },
};

export function part1(lines: string[]) {
  const [regSettings, instructions] = lines.join('\n').split('\n\n');
  const registers = {};
  regSettings.split('\n').forEach((regSetting) => {
    const [, key, val] = regSetting.match(/Register (\w+): (\d+)/);
    registers[key] = Number(val);
  });
  const [, instrStr] = instructions.match(/Program: ([\d,]+)/);
  const instrs = instrStr.split(',').map(Number);
  let pointer = 0;
  const outputs = [];
  while (true) {
    const opCode = instrs[pointer];
    if (opCode === undefined) break;
    const operand = instrs[pointer + 1];

    pointer = opFns[opCode](registers, operand, pointer, (val) => {
      outputs.push(val);
    });
  }
  return outputs.join(',');
}

export function part2(lines: string[]) {
  const [regSettings, instructions] = lines.join('\n').split('\n\n');
  const oldregisters = {};
  regSettings.split('\n').forEach((regSetting) => {
    const [, key, val] = regSetting.match(/Register (\w+): (\d+)/);
    oldregisters[key] = Number(val);
  });
  const [, instrStr] = instructions.match(/Program: ([\d,]+)/);
  const instrs = instrStr.split(',').map(Number);
  let startA = 0;
  for (let i = 15; i >= 0; i--) {
    for (let a = startA; ; a++) {
      const registers = { ...oldregisters, A: a };
      let pointer = 0;
      const outputs = [];
      while (true) {
        const opCode = instrs[pointer];
        if (opCode === undefined) break;
        const operand = instrs[pointer + 1];

        pointer = opFns[opCode](registers, operand, pointer, (val) => {
          outputs.push(val);
        });
        if (
          outputs.length === 16 - i &&
          outputs.every((output, j) => output === instrs[i + j])
        ) {
          if (i === 0) return a;
          startA = a * 8;
          break;
        } else if (outputs.length > 16 - i) break;
      }
      if (startA > a) break;
    }
  }
}
