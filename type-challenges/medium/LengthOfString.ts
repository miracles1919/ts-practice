{
  type LengthOfString<
    T extends string,
    L extends string[] = []
  > = T extends `${infer F}${infer R}`
    ? LengthOfString<R, [...L, F]>
    : L['length'];

  type l1 = LengthOfString<'abc'>;
  type l2 = LengthOfString<''>;
}
