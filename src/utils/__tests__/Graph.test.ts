import { Graph } from '../Graph';

describe('Graph', () => {
  it('dijkstra finds shortest paths', () => {
    const g = new Graph();
    g.addPath('A', 'B', 3, true);
    g.addPath('B', 'C', 10, true);
    g.addPath('A', 'C', 5, true);
    g.addPath('C', 'D', 1);
    const map = g.dijkstra('A');
    expect(map.A).toBe(0);
    expect(map.D).toBe(6);
  });
});
