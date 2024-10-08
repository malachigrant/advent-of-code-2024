const flagRegex = /^-([a-z]+)/;

export class ArgReader {
  private _args: string[];
  constructor() {
    this._args = process.argv;
  }

  public checkFlag(...options: string[]): boolean {
    return options.some((option) => {
      if (flagRegex.test(option)) {
        if (
          this._args.find(
            (val) => flagRegex.test(val) && val.includes(option.substring(1)),
          )
        ) {
          return true;
        }
      }
      return !!this._args.find((val) => val === option);
    });
  }
}
