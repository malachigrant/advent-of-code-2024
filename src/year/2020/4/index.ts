export function part1(lines: string[]) {
  let sum = 0;
  const passports = lines.join('\n').split('\n\n');
  passports.forEach((passport) => {
    const data: Record<string, string> = passport
      .split(/\s+/)
      .reduce((acc, curr) => {
        const [key, value] = curr.split(':');
        return { ...acc, [key]: value };
      }, {});
    if (
      data.byr &&
      data.iyr &&
      data.eyr &&
      data.hgt &&
      data.hcl &&
      data.ecl &&
      data.pid
    ) {
      sum++;
    }
  });
  return sum;
}

function yearValid(year, min, max) {
  if (year.length === 4 && year.match(/(\d{4})/)) {
    if (Number(year) >= min && Number(year <= max)) {
      return true;
    }
  }
  return false;
}

function heightValid(hgt) {
  const match = hgt.match(/^(\d+)(in|cm)$/);
  if (match) {
    const [, heightStr, unit] = match;
    const h = Number(heightStr);
    if (unit === 'cm') {
      return h >= 150 && h <= 193;
    } else {
      return h >= 59 && h <= 76;
    }
  }
  return false;
}

function hclValid(hcl) {
  return !!hcl.match(/^#[\da-f]{6}$/);
}

function eclValid(ecl) {
  return !!ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
}

function pidValid(pid) {
  return !!pid.match(/^(\d{9})$/);
}

export function part2(lines: string[]) {
  let sum = 0;
  const passports = lines.join('\n').split('\n\n');
  passports.forEach((passport) => {
    const data: Record<string, string> = passport
      .split(/\s+/)
      .reduce((acc, curr) => {
        const [key, value] = curr.split(':');
        return { ...acc, [key]: value };
      }, {});
    if (
      data.byr &&
      yearValid(data.byr, 1920, 2002) &&
      data.iyr &&
      yearValid(data.iyr, 2010, 2020) &&
      data.eyr &&
      yearValid(data.eyr, 2020, 2030) &&
      data.hgt &&
      heightValid(data.hgt) &&
      data.hcl &&
      hclValid(data.hcl) &&
      data.ecl &&
      eclValid(data.ecl) &&
      data.pid &&
      pidValid(data.pid)
    ) {
      sum++;
    }
  });
  return sum;
}
