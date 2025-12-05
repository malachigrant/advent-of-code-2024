export function part1(lines: string[]) {
  let sum = 0;
  const [freshRangesStrs, itemsStrs] = lines
    .join('\n')
    .split('\n\n')
    .map((section) => section.split('\n'));
  const items = itemsStrs.map(Number);
  const freshRanges = freshRangesStrs.map((rangeStr) => {
    const [minStr, maxStr] = rangeStr.split('-');
    return { min: Number(minStr), max: Number(maxStr) };
  });
  items.forEach((item) => {
    for (const range of freshRanges) {
      if (item >= range.min && item <= range.max) {
        sum++;
        return;
      }
    }
  });
  return sum;
}

export function part2(lines: string[]) {
  const [freshRangesStrs, itemsStrs] = lines
    .join('\n')
    .split('\n\n')
    .map((section) => section.split('\n'));
  let freshRanges = freshRangesStrs.map((rangeStr) => {
    const [minStr, maxStr] = rangeStr.split('-');
    return { min: Number(minStr), max: Number(maxStr) };
  });
  let didMerge = false;
  let mergedRanges;
  do {
    didMerge = false;
    mergedRanges = [freshRanges[0]];
    for (let i = 1; i < freshRanges.length; i++) {
      const currentRange = freshRanges[i];
      if (
        !mergedRanges.some((mergedRange) => {
          if (
            currentRange.max < mergedRange.min ||
            currentRange.min > mergedRange.max
          ) {
            // No overlap
            return false;
          } else {
            // Overlap, merge ranges
            mergedRange.min = Math.min(mergedRange.min, currentRange.min);
            mergedRange.max = Math.max(mergedRange.max, currentRange.max);
            didMerge = true;
            return true;
          }
        })
      ) {
        mergedRanges.push(currentRange);
      }
    }
    freshRanges = mergedRanges;
  } while (didMerge);
  let sum = 0;
  mergedRanges.forEach((range) => {
    sum += range.max - range.min + 1;
  });
  return sum;
}
