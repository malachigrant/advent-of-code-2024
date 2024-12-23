import { Graph } from '../../../utils/Graph';

export function part1(lines: string[]) {
  const graph = new Graph();
  const pcSet = new Set<string>();
  lines.forEach((line) => {
    const [pc1, pc2] = line.split('-');
    pcSet.add(pc1);
    pcSet.add(pc2);
    graph.addPath(pc1, pc2, 1, true);
  });
  let sum = 0;
  const pcArr = [...pcSet];
  for (let i = 0; i < pcArr.length; i++) {
    for (let j = i + 1; j < pcArr.length; j++) {
      for (let k = j + 1; k < pcArr.length; k++) {
        const pc1 = pcArr[i];
        const pc2 = pcArr[j];
        const pc3 = pcArr[k];
        if (
          !pc1.startsWith('t') &&
          !pc2.startsWith('t') &&
          !pc3.startsWith('t')
        )
          continue;
        if (
          graph.hasDirectPath(pc1, pc2) &&
          graph.hasDirectPath(pc2, pc3) &&
          graph.hasDirectPath(pc3, pc1)
        ) {
          sum++;
        }
      }
    }
  }
  return sum;
}

function getSubsets(set: Set<string>, graph: Graph<string>) {
  const subsets = [];
  const arr = [...set];
  for (let i = 0; i < arr.length; i++) {
    const subset = [arr[i]];
    for (let j = 0; j < arr.length; j++) {
      if (j != i && subset.every((pc) => graph.hasDirectPath(pc, arr[j])))
        subset.push(arr[j]);
    }
    subsets.push(subset);
  }
  return subsets;
}

export function part2(lines: string[]) {
  const graph = new Graph();
  const pcSet = new Set<string>();
  lines.forEach((line) => {
    const [pc1, pc2] = line.split('-');
    pcSet.add(pc1);
    pcSet.add(pc2);
    graph.addPath(pc1, pc2, 1, true);
  });
  const pcArr = [...pcSet];
  const sets = [];
  for (let i = 0; i < pcArr.length; i++) {
    const set = new Set<string>();
    set.add(pcArr[i]);
    for (let j = i + 1; j < pcArr.length; j++) {
      if (j != i && graph.hasDirectPath(pcArr[i], pcArr[j])) set.add(pcArr[j]);
    }
    sets.push(set);
  }
  let longest = 0;
  let finalSet;
  sets.forEach((set) => {
    getSubsets(set, graph).forEach((subset) => {
      if (subset.length > longest) {
        longest = subset.length;
        finalSet = subset;
      }
    });
  });
  return [...finalSet].sort().join(',');
}
