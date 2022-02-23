type TrimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer R}`
  ? TrimLeft<R>
  : T;
{
  type trimed = TrimLeft<'  Hello World  '>; // 应推导出 'Hello World  '
}
