export function cache(fn: (...args: unknown[]) => unknown) {
  const _cache = {};
  return (...args: unknown[]) => {
    const key = args.map((a) => a.toString()).join(',');
    if (_cache[key]) {
      return _cache[key].value;
    }
    const result = fn(...args);
    _cache[key] = { value: result };
    return result;
  };
}
