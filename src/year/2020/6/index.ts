import { sumReducer } from '../../../utils/ReducerUtil';

export function part1(lines: string[]) {
  const groups = lines.join('\n').split('\n\n');
  let sum = 0;
  return groups
    .map((group) => {
      const people = group.split('\n');
      const answerSet = new Set();
      people.forEach((person) => {
        const answers = person.split('');
        answers.forEach((answer) => answerSet.add(answer));
      });
      return answerSet.size;
    })
    .reduce(sumReducer);
}

export function part2(lines: string[]) {
  const groups = lines.join('\n').split('\n\n');
  let sum = 0;
  return groups
    .map((group) => {
      const people = group.split('\n');
      const answerMap = {};
      function add(answer) {
        if (answerMap[answer]) answerMap[answer]++;
        else answerMap[answer] = 1;
      }
      people.forEach((person) => {
        const answers = person.split('');
        answers.forEach((answer) => add(answer));
      });
      return Object.values(answerMap).filter((count) => count === people.length)
        .length;
    })
    .reduce(sumReducer);
}
