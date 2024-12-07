export default function (plop) {
  plop.setGenerator('new day', {
    description: 'Creates a new day folder and initializes files',
    prompts: [
      {
        type: 'input',
        name: 'year',
        message: 'Insert year',
        default: new Date().getFullYear(),
      },
      {
        type: 'input',
        name: 'day',
        message: 'Insert day',
        default: new Date().getDay() + 1,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/year/{{year}}/{{day}}/input.txt',
        template: '__TEST_RESULTS__X__Y',
      },
      {
        type: 'add',
        path: 'src/year/{{year}}/{{day}}/testInput.txt',
        template: '__TEST_RESULTS__X__Y',
      },
      {
        type: 'add',
        path: 'src/year/{{year}}/{{day}}/index.ts',
        templateFile: 'templates/day.hbs',
      },
    ],
  });
}
