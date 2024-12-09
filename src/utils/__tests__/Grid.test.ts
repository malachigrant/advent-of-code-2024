import { Grid } from '../Grid';

describe('Grid', () => {
  const grid = new Grid([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  it('can get values in cells', () => {
    expect(grid.get(0, 0)).toBe(1);
    expect(grid.get(0, 1)).toBe(4);
    expect(grid.get(2, 0)).toBe(3);
  });

  it('uses fallback when trying to get values outside of grid', () => {
    expect(grid.get(-1, -1)).toBe(null);
    expect(grid.get(3, 3)).toBe(null);
    expect(grid.get(-1, 3, 'test')).toBe('test');
  });

  it('can set values in cells', () => {
    expect(grid.set(0, 0, 11)).toBeTruthy();
    expect(grid.get(0, 0)).toBe(11);
    expect(grid.set(3, 3, 50)).toBeFalsy();
  });

  it('forEach loops through all cells', () => {
    const allResults = [];
    grid.forEach((val, x, y) => allResults.push({ val, x, y }));
    expect(allResults.length).toBe(9);
    expect(allResults[0].x).toBe(0);
    expect(allResults[0].y).toBe(0);
    expect(allResults[0].val).toBe(11);
  });
});
