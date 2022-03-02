{
  type IsTuple<T> = T extends readonly any[]
    ? number extends T['length']
      ? false
      : true
    : false;

  // Tuple is a kind of Array with fixed length.

  type case1 = IsTuple<[number]>; // true
  type case2 = IsTuple<readonly [number]>; // true
  type case3 = IsTuple<number[]>; // false
}
