{
  type KebabCase<
    T extends string,
    P extends string = ''
  > = T extends `${infer F}${infer R}`
    ? F extends Lowercase<F>
      ? `${F}${KebabCase<R, '-'>}`
      : `${P}${Lowercase<F>}${KebabCase<R, '-'>}`
    : T;

  type t1 = KebabCase<'FooBarBaz'>;
  type t2 = KebabCase<'foo-bar'>;
}
