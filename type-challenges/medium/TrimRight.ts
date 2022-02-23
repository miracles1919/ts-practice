type TrimRight<T extends string> = T extends `${infer R}${' ' | '\n' | '\t'}`
  ? TrimRight<R>
  : T;

{
  type trimed = TrimRight<'  Hello World  '>; // 应推导出 'Hello World  '
}
