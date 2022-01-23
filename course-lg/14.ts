// 工具类型

// 1.操作接口类型

interface Per {
  name: string;
  age?: number;
}

// Partial: 将一个类型的每个属性变为可选的
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

type PartialPer = Partial<Per>;

// Required: 将一个类型的每个属性变为必填的
// type Required<T> = {
//   [P in keyof T]-?: T[P] // -? 表示去除可选属性
// }

type RequiredPer = Required<Per>;

// Readonly: 将一个类型的每个属性变为只读的
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P]
// }
type ReadonlyPer = Readonly<Per>;

// Pick: 从指定的类型中获取指定的键值
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
type PickPer = Pick<Per, 'name'>;

// Omit: 从指定的类型中省略指定的键值，与Pick相反
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type OmitPer = Omit<Per, 'name'>;

// 2.联合类型

type ABC = 'a' | 'b' | 'c';

// Exclude: 从类型中去除指定类型
// 注意: extends 在 type 中表示 可分配
// type Exclude<T, U> = T extends U ? never : T;

type ExcludeABC = Exclude<ABC, 'a'>;

// Extract: 从类型中获取指定类型
// type Extract<T, U> = T extends U ? T : never;

type ExtractABC = Extract<ABC, 'a' | 'b'>;

// 实例：获取接口类型交集的工具类型
{
  type Intersect<T, U> = {
    [K in Extract<keyof T, keyof U>]: T[K];
  };

  interface P1 {
    name: string;
    age?: number;
    weight?: number;
  }

  interface P2 {
    name: string;
    age?: number;
  }

  type P = Intersect<P1, P2>;
}

// NonNullable: 去除null或者undefined的类型
// type NonNullable<T> = T extends null | undefined ? never : T;

type NonNullableABC = NonNullable<ABC | null | undefined>;

// Record: 根据传入的属性和值生成类型
// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

// keyof any 表示对象的属性
type K = keyof any; // string | number | symbol

type RecordABC = Record<ABC, { name: string }>;

// 3.函数类型
// ConstructorParameters: 获取构造函数的参数类型，并以元祖返回
// type ConstructorParameters<T extends abstract new (...args: any) => any> =
//   T extends abstract new (...args: infer P) => any ? P : never;

class PersonClass {
  constructor(name: string, age?: number) {}
}
type PersonConParams = ConstructorParameters<typeof PersonClass>; // [name: string, age?: number | undefined]

// Parameters: 获取函数的参数类型，并以元祖返回
// type Parameters<T extends (...args: any) => any> = T extends (
//   ...args: infer P
// ) => any
//   ? P
//   : never;

type ParamsFun = Parameters<() => void>; // []
type ParamsFun2 = Parameters<(name: string, age: number) => void>; // [name: string, age: number]
type ParamsFun3 = Parameters<(...rest: number[]) => void>; // number[]

// ReturnType: 获取函数返回类型
// type ReturnType<T extends (...args: any) => any> = T extends (
//   ...args: any
// ) => infer R
//   ? R
//   : never;

type ReturnTypeFun = ReturnType<() => void>; // void
type ReturnTypeFun2 = ReturnType<() => string>; // string

// ThisParameterType: 获取函数this参数的类型
// type ThisParameterType<T> = T extends (this: infer U, ...args: any) => any ? U : unknown

type ThisParameterTypeFun = ThisParameterType<(this: Window) => void>; // Window

// OmitThisParameter: 省略函数类型中的this类型
// type OmitThisParameter<T> = unknown extends ThisParameterType<T>
//   ? T
//   : T extends (...args: infer A) => infer R
//   ? (...args: A) => R
//   : T;

type OmitThisParameterTypeFun = OmitThisParameter<
  (this: Window, x: string) => void
>; // (x: string) => void

// ThisType: 标记this类型
// interface ThisType<T> {}

type SumObj<D, M> = {
  x: number;
  y: number;
  sum: M & ThisType<D & M>;
};

function getObj<D, M>(data: D, methods: M & ThisType<D & M>): D & M {
  return { ...data, ...methods };
}

const sumObj = getObj(
  { x: 1, y: 2 },
  {
    sum() {
      this.x + this.y;
    },
  }
);

sumObj.sum();

// 4.字符串类型 - 模板字符串字面量类型

// type Uppercase<S extends string> = intrinsic
// type Lowercase<S extends string> = intrinsic;
// type Capitalize<S extends string> = intrinsic;
// type Uncapitalize<S extends string> = intrinsic;

type S0 = Uppercase<'str'>; // STR
type S1 = Lowercase<'STR'>; // str
type S2 = Capitalize<'str'>; // Str
type S3 = Uncapitalize<'Str'>; // str

// 实际实现: 通过js的 toUpperCase、toLowerCase
// function applyStringMapping(symbol: Symbol, str: string) {
//   switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
//     case IntrinsicTypeKind.Uppercase:
//       return str.toUpperCase();
//     case IntrinsicTypeKind.Lowercase:
//       return str.toLowerCase();
//     case IntrinsicTypeKind.Capitalize:
//       return str.charAt(0).toUpperCase() + str.slice(1);
//     case IntrinsicTypeKind.Uncapitalize:
//       return str.charAt(0).toLowerCase() + str.slice(1);
//   }
//   return str
// }
