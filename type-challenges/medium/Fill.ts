{
  type Fill<
    T extends unknown[],
    N,
    Start extends number = 0,
    End extends number = T['length'],
    U extends unknown[] = []
  > = T extends [infer F, ...infer R]
    ? U['length'] extends Start
      ? Start extends End
        ? [...U, ...T]
        : Fill<R, N, [...U, N]['length'] & number, End, [...U, N]>
      : Fill<R, N, Start, End, [...U, F]>
    : U;

  type f1 = Fill<[], 0>;
  type f2 = Fill<[], 0, 0, 3>;
  type f3 = Fill<[1, 2, 3], 0, 0, 0>;
  type f4 = Fill<[1, 2, 3], true>;
  type f5 = Fill<[1, 2, 3], true, 0, 1>;
  type f6 = Fill<[1, 2, 3], true, 1, 2>;
}
