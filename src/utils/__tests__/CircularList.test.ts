import { CircularList } from '../CircularList';

describe('CircularList', () => {
  it('can get from list', () => {
    const cList = new CircularList([5, 10, 20, 40]);
    expect(cList.get(0)).toBe(5);
    expect(cList.get(3)).toBe(40);
    expect(cList.get(-1)).toBe(40);
    expect(cList.get(4)).toBe(5);
    expect(cList.get(14)).toBe(20);
  });
});
