{
  type ObjectEntries<T, K extends keyof T = keyof T> = K extends keyof T
    ? [K, Required<T>[K]]
    : never;

  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model>; // ['name', string] | ['age', number] | ['locations', string[] | null];
  type modelEntries2 = ObjectEntries<Partial<Model>>; // ['name', string] | ['age', number] | ['locations', string[] | null];
}
