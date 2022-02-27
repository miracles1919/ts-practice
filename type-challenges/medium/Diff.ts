{
  type Diff<O, O1> = {
    [K in
      | Exclude<keyof O1, keyof O>
      | Exclude<keyof O, keyof O1>]: K extends keyof O
      ? O[K]
      : K extends keyof O1
      ? O1[K]
      : never;
  };

  type Diff2<O, O1> = {
    [K in keyof O | keyof O1 as K extends keyof O
      ? K extends keyof O1
        ? never
        : K
      : K]: (O & O1)[K];
  };

  type Foo = {
    name: string;
    age: string;
  };
  type Bar = {
    name: string;
    age: string;
    gender: number;
  };

  type d1 = Diff<Foo, Bar>;
  type d2 = Diff<Bar, Foo>;
}
