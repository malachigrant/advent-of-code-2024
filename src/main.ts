import { readdir } from 'fs/promises';
import { ArgReader } from './cmdUtil';
import prompts from 'prompts';
import path from 'path';
import { fileURLToPath } from 'url';
import { exit } from 'process';

const __dirname = fileURLToPath(import.meta.url);

const argReader = new ArgReader();

if (argReader.checkFlag('-t', '--today')) {
  // use todays date
  console.log(new Date());
  exit();
}

if (argReader.checkFlag('-r', '--repeat')) {
  // repeat last day ran
  console.log('repeat');
  exit();
}
const years = await readdir(path.join(__dirname, '../year'));

const { year } = await prompts([
  {
    type: 'select',
    name: 'year',
    message: 'Select year:',
    choices: years.map((year) => ({ title: year, value: year })),
  },
]);

const days = await readdir(path.join(__dirname, '../year', year, 'day'));

const { day } = await prompts([
  {
    type: 'select',
    name: 'day',
    message: 'Select day:',
    choices: days.map((day) => ({ title: day, value: day })),
  },
]);

console.log(year, day);
