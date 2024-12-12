import { BaseGrid } from './BaseGrid';

export class Grid<T> extends BaseGrid<T> {
  private _grid: T[][];
  constructor(grid: T[][]) {
    super();
    this._grid = grid;
  }

  public isInBounds(x: number, y: number) {
    return (
      x >= 0 && y >= 0 && x < this._grid[0].length && y < this._grid.length
    );
  }

  public get(x: number, y: number, defaultValue = null) {
    if (!this.isInBounds(x, y)) {
      return defaultValue;
    }
    return this._grid[y][x];
  }

  public set(x: number, y: number, value: T): boolean {
    if (this.isInBounds(x, y)) {
      this._grid[y][x] = value;
      return true;
    }
    return false;
  }

  public forEach(fn: (value: T, x: number, y: number) => void) {
    this._grid.forEach((row, y) => {
      row.forEach((value, x) => {
        fn(value, x, y);
      });
    });
  }

  public getHeight(): number {
    return this._grid.length;
  }

  public getWidth(): number {
    return this._grid[0].length;
  }

  public getNeighbours(
    x: number,
    y: number,
    defaultValue?,
  ): { value: T; x: number; y: number }[] {
    return [
      { value: this.get(x, y - 1, '.'), x, y: y - 1 },
      { value: this.get(x + 1, y, '.'), x: x + 1, y },
      { value: this.get(x, y + 1, '.'), x, y: y + 1 },
      { value: this.get(x - 1, y, '.'), x: x - 1, y },
    ];
  }
}
