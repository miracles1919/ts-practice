{
  type AppendToObject<T extends {}, U extends keyof any, V> = {
    [K in keyof T | U]: K extends keyof T ? T[K] : V;
  };

  type Test = { id: '1' };
  type Result = AppendToObject<Test, 'value', 4>; // expected to be { id: '1', value: 4 }
}
