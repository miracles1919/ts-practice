{
  type GreaterThan<
    T extends number,
    U extends number,
    M extends any[] = [],
    N extends any[] = []
  > = T extends U
    ? false
    : U extends N['length']
    ? true
    : T extends M['length']
    ? false
    : GreaterThan<T, U, [...M, any], [...N, any]>;

  type g1 = GreaterThan<2, 1>;
  type g2 = GreaterThan<1, 2>;
}
