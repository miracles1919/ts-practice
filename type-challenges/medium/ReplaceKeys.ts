{
  type ReplaceKeys<U, T, Y> = {
    [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
  };

  type NodeA = {
    type: 'A';
    name: string;
    flag: number;
  };

  type NodeB = {
    type: 'B';
    id: number;
    flag: number;
  };

  type NodeC = {
    type: 'C';
    name: string;
    flag: number;
  };

  // type Nodes = NodeA | NodeB | NodeC;
  type Nodes = NodeA | NodeB;

  type n1 = ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>;
}
