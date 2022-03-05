{
  type LastIndexOf<T extends unknown[], N extends number> = T extends [
    ...infer R,
    infer L
  ]
    ? L extends N
      ? R['length']
      : LastIndexOf<R, N>
    : -1;

  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2>; // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2>; // -1
}
