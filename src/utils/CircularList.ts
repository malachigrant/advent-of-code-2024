import { getLoopingNum } from './NumberUtil';

export class CircularList<T> {
  private _list: T[];

  constructor(list?: T[]) {
    this._list = list || [];
  }

  private getInternalIndex(index: number) {
    return getLoopingNum(index, 0, this._list.length);
  }

  public get(index: number) {
    return this._list[this.getInternalIndex(index)];
  }

  public set(index: number, value: T) {
    this._list[this.getInternalIndex(index)] = value;
  }

  public remove(index: number) {
    this._list.splice(this.getInternalIndex(index), 1);
  }

  public add(index: number, value: T) {
    this._list.splice(this.getInternalIndex(index), 0, value);
  }
}
