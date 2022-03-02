{
  type GenerateArray<T extends number, U extends any[] = []> = `${T}` extends
    | `0`
    | `-${number}`
    ? []
    : U['length'] extends T
    ? U
    : GenerateArray<T, [any, ...U]>;

  type Add<M extends number, N extends number> = [
    ...GenerateArray<M>,
    ...GenerateArray<N>
  ]['length'];

  type MinusOne<T extends number> = GenerateArray<T> extends [any, ...infer R]
    ? R['length']
    : never;

  type a1 = Add<1, 2>;
  type a2 = Add<3, 5>;

  type m1 = MinusOne<1>;
  type m2 = MinusOne<10>;

  type Fibonacci<T extends number> = T extends 1 | 2
    ? 1
    : Add<Fibonacci<MinusOne<MinusOne<T>>>, Fibonacci<MinusOne<T>>>;

  type f1 = Fibonacci<3>;
  type f2 = Fibonacci<8>;

  type Fibonacci2<
    T extends number,
    CurrIndex extends any[] = [any],
    Prev extends any[] = [],
    Curr extends any[] = [any]
  > = CurrIndex['length'] extends T
    ? Curr['length']
    : Fibonacci2<T, [...CurrIndex, any], Curr, [...Prev, ...Curr]>;
}
