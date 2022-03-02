{
  type Helper<B extends string, E extends string[]> = E extends [
    infer F,
    ...infer R
  ]
    ? F extends string
      ? Helper<`${B}__${F}`, R extends string[] ? R : []>
      : never
    : B;

  type Helper2<B extends string, M extends string[]> = M extends [
    infer F,
    ...infer R
  ]
    ? F extends string
      ? `${B}--${F}` | Helper2<B, R extends string[] ? R : []>
      : never
    : never;

  type h1 = Helper<'btn', ['price']>;
  type h2 = Helper2<'btn__price', ['warning', 'success']>;

  type BEM<
    B extends string,
    E extends string[],
    M extends string[]
  > = M['length'] extends 0 ? Helper<B, E> : Helper2<Helper<B, E>, M>;

  type b1 = BEM<'btn', ['price'], []>;
  type b2 = BEM<'btn', ['price'], ['warning', 'success']>;
  type b3 = BEM<'btn', [], ['warning', 'success']>;

  type BEM2<
    B extends string,
    E extends string[],
    M extends string[]
  > = E extends []
    ? M extends []
      ? B
      : `${B}--${M[number]}`
    : M extends []
    ? `${B}__${E[number]}`
    : `${B}__${E[number]}--${M[number]}`;
}
