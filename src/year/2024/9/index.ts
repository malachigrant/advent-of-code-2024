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
  fileId--;
  while (fileId >= 0) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].id === fileId) {
        for (let j = 0; j < i; j++) {
          if (arr[j].id === -1 && arr[j].length >= arr[i].length) {
            arr[j].length -= arr[i].length;
            arr[i].id = -1;
            arr.splice(j, 0, { id: fileId, length: arr[i].length });
            if (arr[i + 2]?.id === -1) {
              arr[i + 1].length += arr[i + 2].length;
              arr.splice(i + 2, 1);
            }
            if (arr[i - 1]?.id === -1) {
              arr[i].length += arr[i - 1].length;
              arr.splice(i - 1, 1);
            }
            if (arr[j + 1].length === 0) {
              arr.splice(j + 1, 1);
            }
            break;
          }
        }
        break;
      }
    }
    fileId--;
  }
  let sum = 0;
  let i = 0;
  arr.forEach((val) => {
    if (val.id === -1) {
      i += val.length;
      return;
    }
    sum += val.id * (average([i, i + val.length - 1]) * val.length);
    i += val.length;
  });
  return sum;
}
