import { BaseGrid } from './BaseGrid';

export class SparseGrid<T> extends BaseGrid<T> {
  private _grid: Record<string, T>;
  constructor() {
    super();
    this._grid = {};
  }

  private getKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  public get(x: number, y: number, defaultValue = null): T {
    const result = this._grid[this.getKey(x, y)];
    if (result === undefined) return defaultValue;
    return result;
  }

  public set(x: number, y: number, value: T): true {
    this._grid[this.getKey(x, y)] = value;
    return true;
  }

  /**
   * For each entry in the grid, runs the given function with the value, x and y coordinates as parameters
   * Note: for a sparse grid, this will only run on elements that exist in the grid. The order is also not guaranteed.
   * @param fn
   */
  public forEach(fn: (val: T, x: number, y: number) => void): void {
    Object.entries(this._grid).forEach(([key, value]) => {
      const [x, y] = key.split(',').map(Number);
      fn(value, x, y);
    });
  }
}
