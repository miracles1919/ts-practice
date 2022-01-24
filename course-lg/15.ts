// 打造自己的工具类型

// 泛型
type isSubTying<Child, Par> = Child extends Par ? true : false;

type isNumber = isSubTying<1, number>; // true

// 条件类型 - 分配条件类型
type BooleanOrString = string | boolean;

type StringOrNumberArr<T> = T extends string | number ? T[] : T;
type SON1 = StringOrNumberArr<BooleanOrString>; // boolean | string[]
type SON2 = BooleanOrString extends string | number // string | boolean
  ? BooleanString[]
  : BooleanOrString;

type StringOrNumberArr2<T> = T extends [string | number] ? T[] : T;
type SON3 = StringOrNumberArr2<BooleanOrString>; // string | boolean

// never 陷阱
type GetNums = never extends number // number[] never是所有类型的子类型
  ? number[]
  : never extends string
  ? string[]
  : never;

// never是不能分配的底层类型
type NumberOrStringArr<T> = T extends string | number ? T : T[];
type UsefulNeverX<T> = T extends {} ? T[] : [];

type GetNever = StringOrNumberArr<never>; // never
type GetNever2 = NumberOrStringArr<never>; // never
type GetNever3 = UsefulNeverX<never>; // never

// 类型推断 infer
{
  type ElementTypeOfArray<T> = T extends (infer E)[] ? E : never;
  type isNumber = ElementTypeOfArray<number[]>; // number
  type isString = ElementTypeOfArray<string[]>; // string
}

{
  type ElementTypeOfObj<T> = T extends { name: infer N; id: infer I }
    ? [N, I]
    : never;

  type isArray = ElementTypeOfObj<{ name: string; id: number }>; // [string, number]
  type isNever = ElementTypeOfObj<number>; // never
}

// 索引访问类型
interface MixedObject {
  animal: {
    type: 'animal' | 'dog' | 'cat';
    age: number;
  };
  [name: number]: {
    type: string;
    age: number;
    nickname: string;
  };
  [name: string]: {
    type: string;
    age: number;
  };
}

type animal = MixedObject['animal'];
type animalType = MixedObject['animal']['type'];

// keyof
type MixedObjKeys = keyof MixedObject; // string | number
type animalKeys = keyof animal; // "type" | "age"

// typeof
{
  let strA = 'a';
  // 在表达式上下文使用，用来获取表达式值的类型
  const unions = typeof strA; // "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

  // 在类型上下文使用，用来获取变量的类型
  const str: typeof strA = 'str'; // str: string

  type DerivedFromStr = typeof strA; // string
}

{
  const animal = {
    id: 1,
    name: 'animal',
  };
  type Animal = typeof animal;
  const animalFun = () => animal;
  type AnimalFun = typeof animalFun;
}

// 映射类型
type SpecifiedKeys = 'id' | 'name';
type TargetType = {
  [Key in SpecifiedKeys]: any;
}; // { id: any; name: any; }

type TargetGeneric<T extends string | number | symbol> = {
  [Key in T]: any;
};

type TargetInstance = TargetGeneric<SpecifiedKeys>; // { id: any; name: any; }

// 注意: in 只能在类型别名定义中使用，不能在接口中使用
interface SourceInterface {
  readonly id: number;
  name: string;
}
{
  type TargetType = {
    [Key in keyof SourceInterface]: any;
  }; // { readonly id: any; name: any; }

  type TargetGeneric<T> = {
    [Key in keyof T]: T[Key];
  };

  type TargetInstance = TargetGeneric<SourceInterface>; // { readonly id: any; name: any; }
}

// 使用 readonly、？、+、- 修饰符
{
  type TargetGenericReadonly<T> = {
    readonly [K in keyof T]: T[K];
  };
  type TargetGenericTypeReadonlyInstance =
    TargetGenericReadonly<SourceInterface>; // { readonly id: number; readonly name: string }

  type TargetGenericTypeOptional<T> = {
    [K in keyof T]?: T[K];
  };
  type TargetGenericTypeOptionalInstance =
    TargetGenericTypeOptional<SourceInterface>; // { readonly id?: number; name?: string }

  type TargetGenericTypeRemoveReadonly<T> = {
    -readonly [K in keyof T]: T[K];
  };
  type TargetGenericTypeRemoveReadonlyInstance =
    TargetGenericTypeRemoveReadonly<SourceInterface>; //  { id: number; name: string }

  type TargetGenericTypeRemoveOptional<T> = {
    [K in keyof T]-?: T[K];
  };
  type TargetGenericTypeRemoveOptionalInstance =
    TargetGenericTypeRemoveOptional<SourceInterface>; // { readonly id: number; readonly name: string }
}

// as
type TargetGenericTypeAssertiony<T> = {
  [K in keyof T as Exclude<K, 'id'>]: T[K];
};
type TargetGenericTypeAssertionyInstance =
  TargetGenericTypeAssertiony<SourceInterface>;

// 造轮子

// Exclude
type ExcludeSpecifiedNumber = Exclude<1 | 2, 1>; // 2
type ExcludeSpecifiedString = Exclude<'id' | 'name', 'id'>; // name
type ExcludeSpecifiedBoolean = Exclude<boolean, true>; // false

type ExcludeSpecified<T, U> = T extends U ? never : T;

// ReturnTypeOfRes
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type ReturnTypeOfResolved<T extends (...args: any) => any> = T extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : ReturnType<T>;

{
  type isNumber = ReturnTypeOfResolved<() => number>; // number
  type isString = ReturnTypeOfResolved<() => Promise<string>>; // string
}

// Merge
type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? A[K] | B[K]
      : A[K]
    : K extends keyof B
    ? B[K]
    : never;
};
type MergeAB = Merge<{ id: number; name: string }, { id: string; age: number }>;

// Equal
type EqualV1<S, T> = S extends T ? (T extends S ? true : false) : false;
type EqualV1Example1 = EqualV1<1 | number, number>; // true
type EqualV1Example2 = EqualV1<never, never>; // never
type EqualV1Example3 = EqualV1<'1', number>; // false

// 通过[]解除never陷阱
type EqualV2<S, T> = [S] extends [T] ? ([T] extends [S] ? true : false) : false;
type EqualV2Example1 = EqualV2<1 | number, number>; // true
type EqualV2Example2 = EqualV2<never, never>; // true
type EqualV2Example3 = EqualV1<1, any>; // boolean
type EqualV2Example4 = EqualV1<any, 1>; // boolean

// 识别any: any和任何类型交叉得到的都是any，而any是所有类型的父类型（同时也是子类型）
type isAny<T> = 0 extends 1 & T ? true : false; // any和1交叉得到的类型(any)是0的父类型
type EqualV3<S, T> = isAny<S> extends true
  ? isAny<T> extends true
    ? true
    : false
  : isAny<T> extends true
  ? false
  : [S] extends [T]
  ? [T] extends [S]
    ? true
    : false
  : false;

type EqualV3Example1 = EqualV3<1 | number, number>; // true
type EqualV3Example2 = EqualV3<never, never>; // true
type EqualV3Example3 = EqualV3<1, any>; // false
type EqualV3Example4 = EqualV3<any, 1>; // false
