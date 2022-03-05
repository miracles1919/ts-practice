{
  // R为联合类型时会有问题，见第二个例子
  // type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
  //   [K in keyof T]: T[K] extends R['mapFrom'] ? R['mapTo'] : T[K];
  // };

  type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
    [K in keyof T]: T[K] extends R['mapFrom']
      ? R extends { mapFrom: T[K] }
        ? R['mapTo']
        : never
      : T[K];
  };


  type m1 = MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>;
  type m2 = MapTypes<
    { name: string; date: Date },
    { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
  >;
}
