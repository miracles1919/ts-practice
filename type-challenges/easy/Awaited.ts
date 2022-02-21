{
  type Awaited<T> = T extends Promise<infer P> ? P : never;

  type ResultX = Awaited<Promise<string>>;
  type ResultY = Awaited<Promise<{ field: number }>>;
}
