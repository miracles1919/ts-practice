{
  type Trim<T extends string> = TrimLeft<TrimRight<T>>;

  type trimed = Trim<'  Hello World  '>;
}
