{
  type Replace<
    S extends string,
    From extends string,
    To extends string
  > = From extends ''
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S;
  type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // 期望是 'types are awesome!'
}
