import { cache } from '../CacheUtil';

describe('CacheUtil', () => {
  it('cache', () => {
    const fn = jest.fn();
    const cachedFn = cache(fn);
    cachedFn(1);
    cachedFn(1);
    expect(fn).toHaveBeenCalledTimes(1);
    cachedFn(2);
    cachedFn(2);
    cachedFn(2);
    cachedFn(3);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
