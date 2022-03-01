{
  type RemoveIndexSignature<T> = {
    [K in keyof T as string extends K
      ? never
      : number extends K
      ? never
      : K]: T[K];
  };

  type Foo = {
    [key: string]: any;
    foo(): void;
  };

  type A = RemoveIndexSignature<Foo>;

  type a1 = string extends string ? true : false;
}
