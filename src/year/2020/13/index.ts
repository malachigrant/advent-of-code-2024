export function part1(lines: string[]) {
  const time = Number(lines[0]);
  let earliest = time + 50000;
  let correctBus = null;
  const buses = lines[1]
    .split(',')
    .filter((x) => x != 'x')
    .map(Number);
  buses.forEach((bus) => {
    let busTime = Math.floor(time / bus) * bus + bus;
    if (busTime < earliest) {
      earliest = busTime;
      correctBus = bus;
    }
  });
  return (earliest - time) * correctBus;
}

// TODO: fix this
export function part2(lines: string[]) {
  const buses = lines[1].split(',');
  let time = 1;
  let adder = 1;
  for (let i = 0; i < buses.length; i++) {
    const busStr = buses[i];
    if (busStr === 'x') continue;
    const bus = Number(busStr);
    while (time % bus !== i) {
      time += adder;
    }
    console.log(bus, time);
    adder = time;
  }
  return time;
}
