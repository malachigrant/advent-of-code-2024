export function part1(lines: string[]) {
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
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== '.') {
      for (let j = 0; j < i; j++) {
        if (arr[j] === '.') {
          arr[j] = arr[i];
          arr[i] = '.';
          break;
        }
      }
    }
  }
  let sum = 0;
  arr.find((val, i) => {
    if (val === '.') return true;
    sum += val * i;
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
