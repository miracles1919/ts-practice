{
  // type FlattenDepth<
  //   T extends any[],
  //   N = 1,
  //   U extends any[] = []
  // > = N extends U['length'] ? T : FlattenDepth<Flatten<T>, N, [...U, any]>;

  // type Flatten<T extends any[], U extends any[] = []> = T extends [
  //   infer F,
  //   ...infer R
  // ]
  //   ? Flatten<R, [...U, ...(F extends any[] ? F : [F])]>
  //   : U;

  type FlattenDepth<T extends any[], N = 1, U extends any[] = []> = T extends [
    infer F,
    ...infer R
  ]
    ? F extends any[]
      ? U['length'] extends N
        ? [F, ...FlattenDepth<R, N, U>]
        : [...FlattenDepth<F, N, [...U, any]>, ...FlattenDepth<R, N, U>]
      : [F, ...FlattenDepth<R, N, U>]
    : T;

  type FlattenOne<T extends any[]> = T extends [infer F, ...infer R]
    ? F extends any[]
      ? [...F, ...FlattenOne<R>]
      : [F, ...FlattenOne<R>]
    : T;

  type FlattenDepth2<
    T extends any[],
    N = 1,
    U extends any[] = []
  > = T extends FlattenOne<T>
    ? T
    : U['length'] extends N
    ? T
    : FlattenDepth2<FlattenOne<T>, N, [...U, any]>;

  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>; // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  type c = FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>;
  type d = FlattenDepth2<[1, 2, [3, 4], [[[5]]]], 19260817>;
}
