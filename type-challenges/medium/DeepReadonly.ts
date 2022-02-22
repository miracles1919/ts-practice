{
  type DeepReadonly<T> = {
    readonly [K in keyof T]: keyof T[K] extends never
      ? T[K]
      : DeepReadonly<T[K]>;
  };

  type X = {
    x: {
      a: 1;
      b: 'hi';
    };
    y: 'hey';
  };

  type Expected = {
    readonly x: {
      readonly a: 1;
      readonly b: 'hi';
    };
    readonly y: 'hey';
  };

  type Todo = DeepReadonly<X>;

  type x = keyof 1 extends never ? true : false
  type y = keyof {} extends never ? true : false
  type z = DeepReadonly<1>
  type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
  };
  type a = keyof number
}
