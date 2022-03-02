{
  type Reverse<T> = T extends [...infer R, infer L] ? [L, ...Reverse<R>] : [];

  type FlipArguments<T> = T extends (...args: infer Args) => infer R
    ? (...args: Reverse<Args>) => R
    : never;

  type Flipped = FlipArguments<
    (arg0: string, arg1: number, arg2: boolean) => void
  >;
}
