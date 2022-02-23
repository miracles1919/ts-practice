declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{
  [K in keyof T]: T[K] extends PromiseLike<infer V> ? V : T[K];
}>;

{
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  const p = Promise.all([promise1, promise2, promise3] as const);
  const p2 = PromiseAll([promise1, promise2, promise3] as const);

  // 分解
  type PromiseList<T extends any[]> = {
    [K in keyof T]: T[K] extends PromiseLike<infer V> ? V : T[K];
  };
  type l1 = PromiseList<[Promise<3>, Promise<string>]>;
}
