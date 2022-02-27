{
  type Absolute<T extends number | string | bigint> =
    `${T}` extends `-${infer V}` ? V : `${T}`;

  type Absolute2<T extends number | string | bigint> = T extends string
    ? T extends `-${infer V}`
      ? V
      : T
    : Absolute2<`${T}`>;

  type a1 = Absolute<'-5'>;
  type a2 = Absolute2<5>;
}
