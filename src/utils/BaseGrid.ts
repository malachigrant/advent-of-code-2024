export abstract class BaseGrid<T> {
  /**
   * Gets the value of a cell in the grid
   * @param x
   * @param y
   * @param defaultValue the value returned if the get fails
   * @returns the value in the cell, or defaultValue if the cell doesn't exist
   */
  public abstract get(x: number, y: number, defaultValue?: T): T;

  /**
   * Sets the value of a cell in the grid
   * @param x
   * @param y
   * @param value
   * @returns true if successful, false otherwise
   */
  public abstract set(x: number, y: number, value: T): boolean;

  public abstract forEach(fn: (value: T, x: number, y: number) => void): void;
}
