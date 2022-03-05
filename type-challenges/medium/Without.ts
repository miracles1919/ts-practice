{
  type TupleToUnion<T> = T extends unknown[] ? T[number] : T;

  type Without<T extends unknown[], U> = T extends [infer F, ...infer R]
    ? F extends TupleToUnion<U>
      ? Without<R, U>
      : [F, ...Without<R, U>]
    : [];

  type Without2<T extends unknown[], U> = T extends [infer F, ...infer R]
    ? F extends Exclude<T[number], U extends unknown[] ? U[number] : U>
      ? [F, ...Without2<R, U>]
      : Without2<R, U>
    : T;

  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
}
