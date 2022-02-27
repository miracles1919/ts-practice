{
  type CamelCase<T extends string> = T extends `${infer F}-${infer R}`
    ? R extends Capitalize<R>
      ? `${F}-${CamelCase<R>}`
      : CamelCase<`${F}${Capitalize<R>}`>
    : T;

  type c1 = CamelCase<'for-bar-baz'>;
  type c2 = CamelCase<'for-Bar-Baz'>;
  type c3 = CamelCase<'-'>;
}
