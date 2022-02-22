{
  type TupleToNestedObject<T extends unknown[], U> = T extends [
    infer F,
    ...infer R
  ]
    ? F extends string
      ? {
          [K in F]: TupleToNestedObject<R, U>;
        }
      : never
    : U;

  type TupleToNestedObject2<T extends unknown[], U> = T extends [
    infer F,
    ...infer R
  ]
    ? {
        [K in F & string]: TupleToNestedObject2<R, U>;
      }
    : U;

  type TupleToNestedObject3<T extends unknown[], U> = T extends [
    infer F,
    ...infer R
  ]
    ? Record<F & string, TupleToNestedObject3<R, U>>
    : U;

  type a = TupleToNestedObject<['a'], string>; // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number>; // {a: {b: number}}

  type c = TupleToNestedObject3<['a', 'b'], number>; // {a: {b: number}}
}
