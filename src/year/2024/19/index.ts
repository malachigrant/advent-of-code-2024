import { cache } from '../../../utils/CacheUtil';

function canMake(pattern: string, available: string[]) {
  if (pattern.length === 0) return true;
  return available.some((aPat) => {
    if (!pattern.startsWith(aPat)) {
      return false;
    }
    return canMake(pattern.substring(aPat.length), available);
  });
}

export function part1(lines: string[]) {
  let sum = 0;
  const [availStr, wantStr] = lines.join('\n').split('\n\n');
  const availablePatterns = availStr.split(', ');
  const wantPatterns = wantStr.split('\n');
  wantPatterns.forEach((pattern) => {
    if (canMake(pattern, availablePatterns)) {
      sum++;
    }
  });
  return sum;
}

const allMakes = cache((pattern: string, available: string[]) => {
  if (pattern.length === 0) return 1;
  return available.reduce((acc, aPat) => {
    if (!pattern.startsWith(aPat)) {
      return acc;
    }
    return acc + allMakes(pattern.substring(aPat.length), available);
  }, 0);
});

export function part2(lines: string[]) {
  let sum = 0;
  const [availStr, wantStr] = lines.join('\n').split('\n\n');
  const availablePatterns = availStr.split(', ');
  const wantPatterns = wantStr.split('\n');
  wantPatterns.forEach((pattern, i) => {
    sum += allMakes(pattern, availablePatterns);
  });
  return sum;
}
