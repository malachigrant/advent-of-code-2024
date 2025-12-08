interface Point {
  x: number;
  y: number;
  z: number;
}

function getDistance(p1: Point, p2: Point): number {
  return Math.sqrt(
    (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2,
  );
}

function addShortest(
  shortestList: { p1: number; p2: number; dist: number }[],
  newPoint: { p1: number; p2: number; dist: number },
  maxCount?: number,
) {
  for (let i = 0; i < shortestList.length || (maxCount && i < maxCount); i++) {
    if (shortestList[i] === undefined || newPoint.dist < shortestList[i].dist) {
      shortestList.splice(i, 0, newPoint);
      if (shortestList.length > maxCount) {
        shortestList.pop();
      }
      break;
    }
  }
}

export function part1(lines: string[], isTest: boolean) {
  const connectionCount = isTest ? 10 : 1000;
  const points: Point[] = lines.map((line) => {
    const [x, y, z] = line.split(',').map(Number);
    return { x, y, z };
  });
  let shortestList = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = getDistance(points[i], points[j]);
      addShortest(
        shortestList,
        {
          p1: i,
          p2: j,
          dist,
        },
        connectionCount,
      );
    }
  }
  const circuits: Set<number>[] = [];
  while (shortestList.length > 0) {
    const firstCircuit = shortestList.pop();
    const newCircuit = new Set([firstCircuit.p1, firstCircuit.p2]);
    let added;
    do {
      added = false;
      shortestList = shortestList.filter(({ p1, p2, dist }) => {
        if (newCircuit.has(p1) || newCircuit.has(p2)) {
          newCircuit.add(p1);
          newCircuit.add(p2);
          added = true;
          return false;
        }
        return true;
      });
    } while (added);
    circuits.push(newCircuit);
  }
  const sizes = circuits.map((c) => c.size).sort((a, b) => b - a);
  return sizes[0] * sizes[1] * sizes[2];
}

export function part2(lines: string[]) {
  const points: Point[] = lines.map((line) => {
    const [x, y, z] = line.split(',').map(Number);
    return { x, y, z };
  });
  let shortestList = [];
  const remainingPoints = new Set();
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = getDistance(points[i], points[j]);
      shortestList.push({ p1: i, p2: j, dist });
      remainingPoints.add(i);
      remainingPoints.add(j);
    }
  }
  shortestList.sort((a, b) => a.dist - b.dist);
  let circuits = [];
  for (let wireCount = 0; wireCount < shortestList.length; wireCount++) {
    let addedIndexes = [];
    circuits.forEach((circuit, i) => {
      if (
        circuit.has(shortestList[wireCount].p1) ||
        circuit.has(shortestList[wireCount].p2)
      ) {
        addedIndexes.push(i);
        circuit.add(shortestList[wireCount].p1);
        circuit.add(shortestList[wireCount].p2);
      }
    });
    if (addedIndexes.length === 0) {
      const newCircuit = new Set();
      newCircuit.add(shortestList[wireCount].p1);
      newCircuit.add(shortestList[wireCount].p2);
      circuits.push(newCircuit);
    } else if (addedIndexes.length > 1) {
      const mainIndex = addedIndexes[0];
      for (let k = 1; k < addedIndexes.length; k++) {
        const indexToMerge = addedIndexes[k];
        circuits[indexToMerge].forEach((point) => {
          circuits[mainIndex].add(point);
        });
        circuits[indexToMerge] = new Set();
      }
      circuits = circuits.filter((circuit) => circuit.size > 0);
    }
    if (circuits.length === 1 && circuits[0].size === points.length) {
      return (
        points[shortestList[wireCount].p1].x *
        points[shortestList[wireCount].p2].x
      );
    }
  }
  return 0;
}
