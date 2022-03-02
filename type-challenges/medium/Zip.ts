{
  type Zip<T extends readonly any[], U extends readonly any[]> = [
    T,
    U
  ] extends [[infer TF, ...infer TR], [infer UF, ...infer UR]]
    ? [[TF, UF], ...Zip<TR, UR>]
    : [];

  type exp = Zip<[1, 2], [true, false]>; // expected to be [[1, true], [2, false]]
}
