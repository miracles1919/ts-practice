{
  type LookUp<T, V> = T extends { type: V } ? T : never;
  type LookUp2<T, V> = T extends { type: string }
    ? V extends T['type']
      ? T
      : never
    : never;

  interface Cat {
    type: 'cat';
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
  }

  interface Dog {
    type: 'dog';
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
    color: 'brown' | 'white' | 'black';
  }

  type MyDog = LookUp<Cat | Dog, 'dog'>;
  type MyCat = LookUp<Cat | Dog, 'cat'>;

  type MyDog2 = LookUp2<Cat | Dog, 'dog'>;
  type MyCat2 = LookUp2<Cat | Dog, 'cat'>;
}
