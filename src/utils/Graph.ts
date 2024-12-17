interface GraphNode<T> {
  label: string;
  paths: { distance: number; otherLabel: string }[];
}

export class Graph<T> {
  private _nodes: Record<string, GraphNode<T>>;
  constructor(nodes?: Record<string, GraphNode<T>>) {
    if (nodes) this._nodes = nodes;
    else this._nodes = {};
  }

  private createNode(label: string) {
    if (this._nodes[label] !== undefined) return;
    this._nodes[label] = { label, paths: [] };
  }

  public addPath(
    fromLabel: string,
    toLabel: string,
    distance = 1,
    biDirectional = false,
  ) {
    this.createNode(fromLabel);
    this.createNode(toLabel);
    this._nodes[fromLabel].paths.push({ distance, otherLabel: toLabel });
    if (biDirectional)
      this._nodes[toLabel].paths.push({ distance, otherLabel: fromLabel });
  }

  public dijkstra(startLabel: string) {
    const map = { [startLabel]: 0 };
    const queue = [startLabel];
    while (queue.length) {
      const label = queue.splice(0, 1)[0];
      this._nodes[label].paths.forEach(({ distance, otherLabel }) => {
        const distToNext = map[label] + distance;
        if (map[otherLabel] === undefined || map[otherLabel] > distToNext) {
          map[otherLabel] = distToNext;
          queue.push(otherLabel);
        }
      });
    }
    return map;
  }
}
