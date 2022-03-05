{
  type IndexOf<
    T extends unknown[],
    N extends number,
    U extends unknown[] = []
  > = T['length'] extends U['length']
    ? -1
    : T[U['length']] extends N
    ? U['length']
    : IndexOf<T, N, [...U, unknown]>;

  type IndexOf2<
    T extends unknown[],
    N extends number,
    U extends unknown[] = []
  > = T extends [infer F, ...infer R]
    ? F extends N
      ? U['length']
      : IndexOf2<R, N, [...U, unknown]>
    : -1;

  type i1 = IndexOf<[1, 2, 3], 2>;
  type i2 = IndexOf<[0, 0, 0], 2>;
}
