// 类型兼容

// any 可以兼容除 never 之外所有的类型，也可以被所有类型兼容

// never 可以赋值给任何类型，但不能被其他类型赋值
{
  let a: never = (() => {
    throw Error('never');
  })();

  let x: number = a;
}

// unknown 不能赋值给除 any 外的任何类型，但其他类型都可以赋值给 unknown（和 never 相反）
{
  let unknown: unknown;

  // let x: number = unknown // Type 'unknown' is not assignable to type 'number'.
  unknown = 1;
}

// void null undefined
// void 仅能赋值给 any 和 unknown，仅 any null undefined 能赋值给 void
// 严格模式下 null undefined 与 void 有类似的兼容性，即不能赋值给除 any 和 unknown 之外的其他类型，其他类型也不能赋值给 null 和 undefined
{
  let thisIsAny: any;
  let thisIsNever: never;
  let thisIsUnknown: unknown;
  let thisIsVoid: void;
  let thisIsUndefined: undefined;
  let thisIsNull: null;

  thisIsAny = thisIsVoid;
  thisIsUnknown = thisIsVoid;

  thisIsVoid = thisIsAny;
  thisIsVoid = thisIsNever;
  thisIsVoid = thisIsUndefined;

  thisIsAny = thisIsNull;
  thisIsUnknown = thisIsNull;

  thisIsAny = thisIsUndefined;
  thisIsUnknown = thisIsUndefined;

  thisIsNull = thisIsAny;
  thisIsNull = thisIsNever;

  thisIsUndefined = thisIsAny;
  thisIsUndefined = thisIsNever;
}

// enum 不同枚举不兼容
{
  enum A {
    one,
  }

  enum B {
    two,
  }

  let a: A;
  let b: B;

  // a = b // Type 'B' is not assignable to type 'A'.
}

// ----------- 类型兼容性 -----------
// 1.子类型：所有子类型和父类型都兼容
{
  const a = 1;
  const num: number = a;

  interface Animal {
    name: string;
  }

  interface Dog extends Animal {
    age: number;
  }

  let animal: Animal;
  let dog: Dog;
  animal = dog;
}

// 2.结构类型：如果两个类型结构一致，则互相兼容
{
  class Dog {
    name = 'dog';
  }

  class Cat {
    name = 'cat';
  }

  interface IDog {
    name: string;
  }

  interface ICat {
    name: string;
  }

  let dog: Dog;
  let cat: Cat;
  dog = cat;

  let dog2: IDog;
  let cat2: ICat;
  dog2 = cat2;
}

{
  interface I1 {
    name: string;
  }
  interface I2 {
    name: string;
    id: number;
  }

  class C2 {
    id = 1;
    name = '1';
  }

  let O1: I1;
  let O2: I2;
  let c2: C2;
  O1 = O2;
  O1 = c2;

  // freshness 特性
  O1 = {
    // id: 2,
    // Type '{ id: number; name: string; }' is not assignable to type 'I1'.
    // Object literal may only specify known properties, and 'id' does not exist in type 'I1'.
    name: 'name',
  };

  // 可以通过变量或类型断言接触 freshness
  let O3 = {
    id: 3,
    name: 'name',
  };
  O1 = O3;

  O1 = {
    id: 2,
    name: 'name',
  } as I2;
}

// 判断类是否兼容时，可以忽略构造函数及静态方法；如果包含私有、保护属性，仅当这些属性和方法源自同一个类，才能兼容
{
  class C1 {
    name = '1';
    private id = 1;
    protected age = 1;
  }

  class C2 {
    name = '2';
  }

  let c1: C1;
  let c2: C2;
  // c1 = c2; // Type 'C2' is missing the following properties from type 'C1': id, age
}

// 泛型：泛型类型、泛型类的兼容性指的是将它们实例化为一个确切的类型后的兼容性

{
  let fun1 = <T>(p1: T): 1 => 1;
  let fun2 = <T>(p1: T): number => 1;

  fun2 = fun1;
}

// 变型

type isChild<Child, Par> = Child extends Par ? true : false;
interface Animal {
  name: string;
}
interface Dog extends Animal {
  woof: () => void;
}

// 1. 协变：如果Dog是Animal的子类型，则F(Dog)是F(Animal)的子类型
{
  type Covariance<T> = T;

  type isCovariant = isChild<Covariance<Dog>, Covariance<Animal>>; // true
  type isPropAssignmentCovariant = isChild<{ type: Dog }, { type: Animal }>;
  type isArrayElementCovariant = isChild<Dog[], Animal[]>;
  type isReturnTypeCovariant = isChild<() => Dog, () => Animal>;
}

// 2. 逆变：如果Dog是Animal的子类型，则F(Dog)是F(Animal)的父类型，如严格模式下的函数参数类型
{
  type Covariance<T> = (params: T) => void;
  type isNotContravariance = isChild<Covariance<Dog>, Covariance<Animal>>; // false
  type isContravariance = isChild<Covariance<Animal>, Covariance<Dog>>; // true
}

// 3. 双向协变：如果Dog是Animal的子类型，则F(Dog)是F(Animal)的父类型，也是子类型，如非严格模式下的函数类型

// 4. 不变：Dog是Animal的子类型，F(Dog)既不是F(Animal)的子类型，也不是父类型


