import { sep } from 'path';
import { BaseGrid } from './BaseGrid';

const horizontalNeighbourOffsets = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const diagonalNeighbourOffsets = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

export class Grid<T> extends BaseGrid<T> {
  private _grid: T[][];
  constructor(grid: T[][]) {
    super();
    this._grid = grid;
  }

  public static of<T>(
    width: number,
    height: number,
    initialValue?: T,
  ): Grid<T> {
    const arr = Array(height)
      .fill(1)
      .map(() => Array(width).fill(initialValue));
    return new Grid<T>(arr);
  }

  public isInBounds(x: number, y: number) {
    return (
      x >= 0 && y >= 0 && x < this._grid[0].length && y < this._grid.length
    );
  }

  public get(x: number, y: number, defaultValue = null): T {
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

  public map<K>(fn: (value: T, x: number, y: number) => K) {
    const newGrid = this._grid.map((row, y) => {
      return row.map((value, x) => {
        return fn(value, x, y);
      });
    });
    return new Grid(newGrid);
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
    includeDiagonals = false,
    defaultValue?,
  ): { value: T; x: number; y: number }[] {
    const offsets = [
      ...horizontalNeighbourOffsets,
      ...(includeDiagonals ? diagonalNeighbourOffsets : []),
    ];
    return offsets.map(([nx, ny]) => ({
      value: this.get(x + nx, y + ny, defaultValue),
      x: x + nx,
      y: y + ny,
    }));
  }

  public log(separator = '') {
    this._grid.forEach((row) => {
      console.log(row.map((val) => val.toString()).join(separator));
    });
  }
}
