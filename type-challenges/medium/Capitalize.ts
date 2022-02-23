{
  interface UppercaseMap {
    a: 'A';
    b: 'B';
    // ...
    h: 'H';
    // ...
  }

  type Capitalize2<T extends string> = T extends `${infer F}${infer R}`
    ? `${Uppercase<F>}${R}`
    : T;

  type Capitalize<T extends string> = T extends `${infer F}${infer R}`
    ? F extends keyof UppercaseMap
      ? `${UppercaseMap[F]}${R}`
      : T
    : T;

  type capitalized = Capitalize<'hello world'>; // expected to be 'Hello world'
}
