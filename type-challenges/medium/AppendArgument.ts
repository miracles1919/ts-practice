{
  type AppendArgument<F extends Function, T> = F extends (
    ...args: infer Args
  ) => infer R
    ? (...args: [...Args, T]) => R
    : never;

  type Fn = (a: number, b: string) => number;

  type Result = AppendArgument<Fn, boolean>;
}
