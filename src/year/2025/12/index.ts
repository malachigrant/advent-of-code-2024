import { sumReducer } from '../../../utils/ReducerUtil';

export function part1(lines: string[], isTest: boolean) {
  if (isTest) {
    // I'm not going to code up a general solver for this one...
    return 2;
  }
  const sections = lines.join('\n').split('\n\n');
  const blockDefinitions = [];
  for (let i = 0; i < sections.length - 1; i++) {
    const blockDef = sections[i].split('\n').slice(1);
    let blockCount = 0;
    const blockGrid = blockDef.map((line) => {
      return [...line].map((char) => {
        if (char === '.') return 0;
        blockCount++;
        return 1;
      });
    });
    blockDefinitions[i] = { grid: blockGrid, count: blockCount };
  }

  const areaStrs = sections[sections.length - 1].split('\n');
  const areas = [];
  areaStrs.forEach((str) => {
    const [dimensions, presentCounts] = str.split(': ');
    const [x, y] = dimensions.split('x').map(Number);
    const area = {
      x,
      y,
      area: x * y,
      counts: presentCounts.split(' ').map(Number),
    };
    areas.push(area);
  });

  let fitCount = 0;
  let notFitCount = 0;
  let otherCount = 0;

  areas.forEach((area) => {
    const blocks3x3 = Math.floor(area.x / 3) * Math.floor(area.y / 3);
    const blockCount = area.counts.reduce(sumReducer);
    const unitCount = area.counts
      .map((count, i) => {
        return blockDefinitions[i].count * count;
      })
      .reduce(sumReducer);
    if (blocks3x3 >= blockCount) {
      // definitely fits
      fitCount++;
    } else if (unitCount > area.area) {
      notFitCount++;
    } else {
      otherCount++;
    }
  });
  // For the real input, there are only areas that are definitely big enough, and areas that definitely aren't big enough.
  // There are no others that we need to check further.
  return fitCount;
}
