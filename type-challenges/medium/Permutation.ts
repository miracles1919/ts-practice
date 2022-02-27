{
  type Permutation<T, U = T> = [T] extends [never]
    ? []
    : T extends U
    ? [T, ...Permutation<Exclude<U, T>>]
    : T;

  type perm = Permutation<'A' | 'B' | 'C'>;
}
