{
  type Chunk<T, N, U extends any[] = [], R extends any[] = []> = T extends [
    infer F,
    ...infer Rest
  ]
    ? Rest extends []
      ? [...R, [...U, F]]
      : [...U, F]['length'] extends N
      ? Chunk<Rest, N, [], [...R, [...U, F]]>
      : Chunk<Rest, N, [...U, F], R>
    : [];

  type c1 = Chunk<[1, 2, 3], 2>;
  type c2 = Chunk<[1], 1>;

  type exp1 = Chunk<[1, 2, 3], 2>; // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4>; // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1>; // expected to be [[1], [2], [3]]

  type Chunk2<T, N, U extends any[] = []> = T extends [infer F, ...infer Rest]
    ? [...U, F]['length'] extends N
      ? [[...U, F], ...Chunk2<Rest, N, []>]
      : Rest extends []
      ? [[...U, F]]
      : Chunk2<Rest, N, [...U, F]>
    : T;
}
