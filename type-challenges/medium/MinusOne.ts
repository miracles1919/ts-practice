{
  // 简单版本，有循环限制
  // type MinusOne<T extends number, U extends any[] = []> = [
  //   ...U,
  //   any
  // ]['length'] extends T
  //   ? U['length']
  //   : MinusOne<T, [...U, any]>;

  type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  type StringDigits = `${Digits}`;
  type Helper<
    T extends StringDigits,
    U extends any[] = []
  > = `${U['length']}` extends T ? U : Helper<T, [...U, any]>;

  type Make10Tuple<T extends any[]> = [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T
  ];

  type TupleGenerator<
    T extends string,
    U extends any[] = []
  > = T extends `${infer F}${infer R}`
    ? F extends `${Digits}`
      ? TupleGenerator<R, [...Make10Tuple<U>, ...Helper<F>]>
      : U
    : U;

  type MinusOne<T extends number> = TupleGenerator<`${T}`> extends [
    _: any,
    ...rest: infer R
  ]
    ? R['length']
    : 0;

  type Zero = MinusOne<1>; // 0
  type FiftyFour = MinusOne<55>; // 54
  type Deep = MinusOne<1101>;
}
