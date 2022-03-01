{
  type DropChar<S, C> = S extends `${infer F}${infer R}`
    ? F extends C
      ? `${DropChar<R, C>}`
      : `${F}${DropChar<R, C>}`
    : S;

  type DropString<S, R> = R extends `${infer F}${infer Rest}`
    ? DropString<DropChar<S, F>, Rest>
    : S;

  type Butterfly = DropString<'foobar!', 'fb'>; // 'ooar!'
}
