import { sumReducer } from '../../../utils/ReducerUtil';

type Operation = '+' | '*';

interface Equation {
  operation?: Operation;
  nums: number[];
}

function evaluate(equation: Equation) {
  let current = equation.nums[0];
  for (let i = 1; i < equation.nums.length; i++) {
    const num = equation.nums[i];
    switch (equation.operation) {
      case '+':
        current += num;
        break;
      case '*':
        current *= num;
        break;
    }
  }
  return current;
}

export function part1(lines: string[]) {
  const equations: Equation[] = [];
  lines.forEach((line, i) => {
    const parts = line.trim().split(/\s+/);
    if (i === lines.length - 1) {
      parts.forEach((part, j) => {
        equations[j].operation = part as Operation;
      });
    } else {
      parts.map(Number).forEach((part, j) => {
        if (equations[j] === undefined) {
          equations[j] = { nums: [] };
        }
        equations[j].nums.push(part);
      });
    }
  });
  return equations.map(evaluate).reduce(sumReducer);
}

export function part2(lines: string[]) {
  const equations: Equation[] = [{ nums: [] }];
  let currentEq = 0;
  for (let i = lines[0].length - 1; i >= 0; i--) {
    let currentNum = '';
    let operation = '';
    for (let j = 0; j < lines.length; j++) {
      const char = lines[j][i];
      if (char.match(/\d/)) {
        currentNum = currentNum + char;
      } else if (char === '+' || char === '*') {
        operation = char;
      }
    }
    if (currentNum) {
      equations[currentEq].nums.push(Number(currentNum));
    }
    if (operation) {
      equations[currentEq].operation = operation as Operation;
      if (i === 0) break;
      currentEq++;
      equations[currentEq] = { nums: [] };
    }
  }
  return equations.map(evaluate).reduce(sumReducer);
}
