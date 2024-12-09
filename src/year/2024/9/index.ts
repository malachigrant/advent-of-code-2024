import { average } from '../../../utils/NumberUtil';

export function part1(lines: string[]) {
  const arr: { id: number; length: number }[] = [];
  let isFile = true;
  let fileId = 0;
  lines[0]
    .split('')
    .map(Number)
    .forEach((num) => {
      if (isFile) {
        arr.push({ id: fileId, length: num });
        fileId++;
      } else {
        arr.push({ id: -1, length: num });
      }
      isFile = !isFile;
    });
  for (let i = arr.length - 1; i >= 0; i--) {
    const file = arr[i];
    if (file.id > -1) {
      let lastEmpty = 0;
      while (file.length > 0 && lastEmpty < i) {
        let didMove = false;
        for (let j = lastEmpty; j < i; j++) {
          const empty = arr[j];
          if (empty.id === -1) {
            lastEmpty = j;
            if (file.length >= empty.length) {
              empty.id = file.id;
              file.length -= empty.length;
              didMove = true;
            } else {
              const fileLength = file.length;
              file.length -= empty.length;
              empty.length -= fileLength;
              arr.splice(j, 0, { id: file.id, length: fileLength });
              didMove = true;
            }
            break;
          }
        }
        if (!didMove) break;
      }
    }
  }
  let sum = 0;
  let i = 0;
  arr.find((val) => {
    if (val.id === -1) return true;
    sum += val.id * (average([i, i + val.length - 1]) * val.length);
    i += val.length;
  });
  return sum;
}

export function part2(lines: string[]) {
  const arr = [];
  let isFile = true;
  let fileId = 0;
  lines[0]
    .split('')
    .map(Number)
    .forEach((num) => {
      if (isFile) {
        for (let i = 0; i < num; i++) {
          arr.push(fileId);
        }
        fileId++;
      } else {
        for (let i = 0; i < num; i++) {
          arr.push('.');
        }
      }
      isFile = !isFile;
    });
  fileId--;
  while (fileId >= 0) {
    let endIndex = 0,
      startIndex = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === fileId) {
        endIndex = i;
        break;
      }
    }
    for (let i = endIndex - 1; i >= 0; i--) {
      if (arr[i] !== fileId) {
        startIndex = i + 1;
        break;
      }
    }
    const len = endIndex - startIndex + 1;
    let emptyStartIndex;
    for (let i = 0; i < startIndex; i++) {
      if (arr[i] === '.') {
        if (emptyStartIndex === undefined) {
          emptyStartIndex = i;
        }
        if (i - emptyStartIndex + 1 === len) {
          for (let j = emptyStartIndex; j < emptyStartIndex + len; j++) {
            arr[j] = fileId;
          }
          for (let j = startIndex; j <= endIndex; j++) {
            arr[j] = '.';
          }
          break;
        }
      } else {
        emptyStartIndex = undefined;
      }
    }
    fileId--;
  }
  let sum = 0;
  arr.forEach((val, i) => {
    if (val === '.') return;
    sum += val * i;
  });
  return sum;
}
