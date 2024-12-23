export function part1(lines: string[]) {
  const bags = new Map<string, Map<string, number>>();
  lines.forEach((line) => {
    const [, container, rest] = line.match(/(.*) bags contain (.*)/);
    if (rest === 'no other bags.') {
      bags.set(container, new Map());
      return;
    } else {
      const contents = rest.split(', ');
      const contentsMap = new Map<string, number>();
      contents.forEach((content) => {
        const [, count, color] = content.match(/(\d+) (.*) bag/);
        contentsMap.set(color, Number(count));
      });
      bags.set(container, contentsMap);
    }
  });
  const checked = new Set<string>();
  const canContain = ['shiny gold'];
  while (canContain.length) {
    const color = canContain.pop();
    bags.forEach((contents, container) => {
      if (contents.has(color) && !checked.has(container)) {
        canContain.push(container);
        checked.add(container);
      }
    });
  }
  return checked.size;
}

function countBagsInside(
  bags: Map<string, Map<string, number>>,
  color: string,
) {
  let count = 0;
  bags.get(color).forEach((num, color) => {
    count += num + num * countBagsInside(bags, color);
  });
  return count;
}

export function part2(lines: string[]) {
  const bags = new Map<string, Map<string, number>>();
  lines.forEach((line) => {
    const [, container, rest] = line.match(/(.*) bags contain (.*)/);
    if (rest === 'no other bags.') {
      bags.set(container, new Map());
      return;
    } else {
      const contents = rest.split(', ');
      const contentsMap = new Map<string, number>();
      contents.forEach((content) => {
        const [, count, color] = content.match(/(\d+) (.*) bag/);
        contentsMap.set(color, Number(count));
      });
      bags.set(container, contentsMap);
    }
  });
  return countBagsInside(bags, 'shiny gold');
}
