{
  type Shift<T> = T extends [a: infer F, ...rest: infer R] ? R : T;

  type Shift2<T> = T extends [any, ...infer R] ? R : T;

  type Result = Shift<[3, 2, 1]>; // [2, 1]
}
