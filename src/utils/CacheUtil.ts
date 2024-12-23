export function cache(
  fn: (...args: unknown[]) => unknown,
  keyFn = (...args) => args.map((a) => a.toString()).join(','),
) {
  const _cache = {};
  return (...args: unknown[]) => {
    const key = keyFn(...args);
    if (_cache[key]) {
      return _cache[key].value;
    }
    const result = fn(...args);
    _cache[key] = { value: result };
    return result;
  };
}
