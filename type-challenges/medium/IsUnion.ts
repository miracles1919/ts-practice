{
  type IsUnion<T, U = T> = T extends U
    ? [U] extends [T]
      ? false
      : true
    : false;

  type IsUnion2<T> = T[] extends (T extends any ? T[] : never) ? false : true;

  type case1 = IsUnion<string>; // false
  type case2 = IsUnion<string | number>; // true
  type case3 = IsUnion<[string | number]>; // false
  // type case4 = IsUnion<[string | number]>; // false
}
