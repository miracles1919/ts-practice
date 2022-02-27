{
  type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
    ? R extends ''
      ? F
      : F | StringToUnion<R>
    : never;

  type StringToUnion2<
    T extends string,
    U = never
  > = T extends `${infer F}${infer R}` ? StringToUnion2<R, F | U> : U;

  type Test = '123';
  type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
}
