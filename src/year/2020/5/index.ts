export function part1(lines: string[]) {
  let largest = -1;
  lines.forEach((line) => {
    const [, row, col] = line.match(/([FB]+)([LR]+)/);
    const r = parseInt(row.replaceAll('F', '0').replaceAll('B', '1'), 2);
    const c = parseInt(col.replaceAll('R', '1').replaceAll('L', '0'), 2);

    const sid = r * 8 + c;
    if (largest === -1 || largest < sid) largest = sid;
  });
  return largest;
}

export function part2(lines: string[], testMode) {
  if (testMode) return 'N/A';
  const list = new Array(1024).fill(false);
  lines.forEach((line) => {
    const [, row, col] = line.match(/([FB]+)([LR]+)/);
    const r = parseInt(row.replaceAll('F', '0').replaceAll('B', '1'), 2);
    const c = parseInt(col.replaceAll('R', '1').replaceAll('L', '0'), 2);

    const sid = r * 8 + c;
    list[sid] = true;
  });
  const firstMissing = list.findIndex((_, id) => {
    return list[id - 1] && list[id + 1] && !list[id];
  });
  return firstMissing;
}
