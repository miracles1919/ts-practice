{
  type StringToUnion<T> = T extends `${infer F}${infer R}`
    ? F | StringToUnion<R>
    : '';

  type Combination<T extends string, U extends string> =
    | T
    | U
    | `${T}${U}`
    | `${U}${T}`;

  type c1 = Combination<'A' | 'B', 'C'>;

  type UnionCombination<T extends string, U extends string = T> = T extends U
    ? Combination<T, UnionCombination<Exclude<U, T>>>
    : never;

  type u1 = UnionCombination<'A' | 'B' | 'C'>;

  type AllCombinations<T extends string> = UnionCombination<StringToUnion<T>>;

  type a1 = AllCombinations<''>;
  type a2 = AllCombinations<'ABC'>;
}
