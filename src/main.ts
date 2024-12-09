import { readdir } from 'fs/promises';
import { ArgReader, readLines } from './cmdUtil';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
import { exit } from 'process';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';

const __dirname = fileURLToPath(import.meta.url);

const argReader = new ArgReader();

const runTest = argReader.checkFlag('-t', '--test');
const repeatLast = argReader.checkFlag('-r', '--repeat');
const useToday = argReader.checkFlag('-d', '--date');

if (!runTest && !repeatLast && !useToday) {
  console.log('Use `-t` or `--test` to run tests');
  console.log('Use `-r` or `--repeat` to repeat the last day you ran');
  console.log('Use `-d` or `--date` to run the current day\n');
}

const currentYear = new Date().getFullYear().toString();
const currentDay = new Date().getDate().toString();

function time(fn) {
  const start = performance.now();
  fn();
  return performance.now() - start;
}

let year: string, day: string;
if (repeatLast) {
  try {
    const [yearR, dayR] = readFileSync('./.lastRun').toString().split(/\s+/);
    year = yearR;
    day = dayR;
  } catch (e) {
    console.log('NO LAST RUN FOUND');
    exit();
  }
} else if (useToday) {
  year = currentYear;
  day = currentDay;
} else {
  const years = await readdir(path.join(__dirname, '../year'));
  const initialYearIndex = years.findIndex(
    (year) => year === currentYear.toString(),
  );

  const { yearPrompt } = await prompts([
    {
      type: 'select',
      name: 'yearPrompt',
      message: 'Select year:',
      choices: years.map((year) => ({ title: year, value: year })),
      initial: initialYearIndex === -1 ? 0 : initialYearIndex,
    },
  ]);

  const days = await readdir(path.join(__dirname, '../year', yearPrompt));
  const initialDayIndex = days.findIndex(
    (day) => day === currentDay.toString(),
  );

  const { dayPrompt } = await prompts([
    {
      type: 'select',
      name: 'dayPrompt',
      message: 'Select day:',
      choices: days.map((day) => ({ title: day, value: day })),
      initial: initialDayIndex === -1 ? 0 : initialDayIndex,
    },
  ]);
  day = dayPrompt;
  year = yearPrompt;
}

console.log(`YEAR ${year} DAY ${day}\n`);
writeFileSync('./.lastRun', `${year} ${day}`);
const dayPath = path.join(__dirname, '../year', year, day);
const inputPath = path.join(dayPath, 'input.txt');
const testInputPath = path.join(dayPath, 'testInput.txt');
const codePath = path.join(dayPath, 'index.ts');

const importedDay = await import(codePath);
const inputLines = readLines(runTest ? testInputPath : inputPath);

const testResultsMatch = inputLines[0].match(/__TEST_RESULTS__(.*)__(.*)/);
let expectedPart1 = null;
let expectedPart2 = null;
if (testResultsMatch) {
  const [, part1, part2] = testResultsMatch;
  expectedPart1 = part1;
  expectedPart2 = part2;
  inputLines.splice(0, 1);
}

if (runTest) console.log('TEST RESULTS\n');
if (importedDay.part1) {
  let part1Result;
  const msP1 = time(() => (part1Result = importedDay.part1(inputLines)));
  console.log(
    `PART 1: ${part1Result} - ${msP1.toLocaleString('en-US', { maximumFractionDigits: 3, useGrouping: false })}ms`,
  );
  if (expectedPart1) {
    if (expectedPart1 === part1Result.toString()) {
      console.log(chalk.green(` MATCHES EXPECTED ${expectedPart1}`));
    } else {
      console.log(chalk.red(` DOES NOT MATCH EXPECTED ${expectedPart1}`));
    }
  }
}
if (importedDay.part2) {
  let part2Result;
  const msP2 = time(() => (part2Result = importedDay.part2(inputLines)));
  console.log(
    `PART 2: ${part2Result} - ${msP2.toLocaleString('en-US', { maximumFractionDigits: 3, useGrouping: false })}ms`,
  );
  if (expectedPart2) {
    if (expectedPart2 === part2Result.toString()) {
      console.log(chalk.green(` MATCHES EXPECTED ${expectedPart2}`));
    } else {
      console.log(chalk.red(` DOES NOT MATCH EXPECTED ${expectedPart2}`));
    }
  }
}
