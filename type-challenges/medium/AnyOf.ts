{
  type AnyOf<T extends readonly any[]> = T[number] extends
    | 0
    | ''
    | false
    | []
    | {
        [K: string]: never;
      }
    ? false
    : true;

  type a1 = AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>;
  type a2 = AnyOf<[0, '', false, [], {}]>;
}
