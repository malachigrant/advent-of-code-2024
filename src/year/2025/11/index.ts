import { cache } from '../../../utils/CacheUtil';

export function part1(lines: string[], isTest: boolean) {
  if (isTest) {
    lines = lines.join('\n').split('\n\n')[0].split('\n');
  }
  const paths = {};
  lines.forEach((line) => {
    const [from, toStr] = line.split(': ');
    const to = toStr.split(' ');
    paths[from] = to;
  });
  return getPaths('you', true, true, paths, 1);
}

function _getPaths(fromNode, hasDac, hasFft, paths, part) {
  const nextPaths = paths[fromNode];
  let outCount = 0;
  nextPaths.forEach((p) => {
    if (p === 'out') {
      if (hasDac && hasFft) {
        outCount++;
      }
      return;
    }
    let dac = hasDac;
    let fft = hasFft;
    if (p === 'dac') {
      dac = true;
    }
    if (p === 'fft') {
      fft = true;
    }
    outCount += getPaths(p, dac, fft, paths, part);
  });
  return outCount;
}
const getPaths = cache(
  _getPaths,
  (fromNode: string, hasDac: boolean, hasFft: boolean, _, part: string) => {
    return `${fromNode}-${hasDac}-${hasFft}-${part}`;
  },
);

export function part2(lines: string[], isTest: boolean) {
  if (isTest) {
    lines = lines.join('\n').split('\n\n')[1].split('\n');
  }
  const paths = {};
  lines.forEach((line) => {
    const [from, toStr] = line.split(': ');
    const to = toStr.split(' ');
    paths[from] = to;
  });
  let outCount = getPaths('svr', false, false, paths, 2);
  return outCount;
}
