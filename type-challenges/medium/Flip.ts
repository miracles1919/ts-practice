{
  type Flip<T> = {
    [K in keyof T as T[K] extends string | number | boolean
      ? `${T[K]}`
      : never]: K;
  };

  type f1 = Flip<{ a: 'x'; b: 'y'; c: 'z' }>; // {x: 'a', y: 'b', z: 'c'}
  type f2 = Flip<{ a: 1; b: 2; c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  type f3 = Flip<{ a: false; b: true }>; // {false: 'a', true: 'b'}
}
