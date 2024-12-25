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

  public static parse(lines: string[]): Grid<string> {
    return new Grid(lines.map((line) => line.split('')));
  }

  public isInBounds(x: number, y: number) {
    return (
      x >= 0 && y >= 0 && x < this._grid[0].length && y < this._grid.length
    );
  }

  public get(x: number, y: number, defaultValue = undefined): T {
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

  public bfs(
    startX: number,
    startY: number,
    canVisitFn = (x, y) =>
      this.getNeighbours(x, y).filter(
        (n) => n.value !== undefined && n.value !== '#',
      ),
  ): Grid<number> {
    const visited = this.map(() => -1);
    visited.set(startX, startY, 0);
    const queue = [[startX, startY]];
    while (queue.length) {
      const [x, y] = queue.splice(0, 1)[0];
      const currentSteps = visited.get(x, y);
      const neighbours = canVisitFn(x, y);
      neighbours.forEach((n) => {
        const nSteps = visited.get(n.x, n.y, -1);
        if (nSteps === -1 || nSteps > currentSteps + 1) {
          visited.set(n.x, n.y, currentSteps + 1);
          queue.push([n.x, n.y]);
        }
      });
    }
    return visited;
  }

  public count(value: T): number {
    let count = 0;
    this.forEach((val) => {
      if (val === value) {
        count++;
      }
    });
    return count;
  }

  public getLine(x: number, y: number, dx: number, dy: number): T[] {
    const line = [];
    let cx = x + dx;
    let cy = y + dy;
    while (this.isInBounds(cx, cy)) {
      line.push(this.get(cx, cy));
      cx += dx;
      cy += dy;
    }
    return line;
  }

  public log(separator = '') {
    this._grid.forEach((row) => {
      console.log(row.map((val) => val.toString()).join(separator));
    });
  }
}
