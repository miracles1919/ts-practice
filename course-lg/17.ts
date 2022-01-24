// 常见错误

// TS2456: 类型别名循环
// type T = Readonly<T> TS2456: Type alias 'T' circularly references itself.

// 如果设定正确的终止条件，可以使用循环引用的特殊结构
type MyJSON =
  | string
  | number
  | boolean
  | null
  | MyJSON[]
  | { [key: string]: MyJSON };

const json1: MyJSON = 'json';
const json2: MyJSON = ['json', 1, true];
const json3: MyJSON = { name: 'name', value: [1, 2, 3] };

// TS2554: 形参和实参个数不匹配
function myToString(x: number | undefined): string {
  if (x === undefined) {
    return '';
  }
  return x.toString();
}

// myToString(); TS2554: Expected 1 arguments, but got 0

// 注意: ts 4.1之后 Promise的resolve参数不再是默认可选的
new Promise((resolve) => {
  // resolve() // TS2794:Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
});

new Promise<void>((resolve) => {
  resolve();
});

new Promise<number>((resolve) => {
  resolve(1);
});

// TS1169: interface 类型的属性必须是字面量类型(stirng | number | symbol)
interface MyObj {
  // [key in 'id' | 'name']: any; TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
}

const symbol = Symbol();
interface MyObj {
  [key: string]: any;
  [key: number]: any;
  [key: symbol]: any;
}

// type 可以
type MyObj2 = {
  [key in 'id' | 'name']: any;
};

// TS2345: 传参类型不兼容
enum A {
  x = 'x',
  y = 'y',
  z = 'z',
}
enum B {
  x = 'x',
  y = 'y',
  z = 'z',
}

function fn(val: A) {}
// fn(B.x) TS2345: Argument of type 'B.x' is not assignable to parameter of type 'A'.ts(2345)

// TS2589: 泛型实例化递归嵌套过深 (目前使用版本已不报错:4.5.4)
type RepeatX<N extends number, T extends any[] = []> = T['length'] extends N
  ? T
  : RepeatX<N, [...T, 'X']>;

type Repeat5X = RepeatX<5>;
type Repeat50X = RepeatX<50>;

// TS2352: 类型收缩
let x: string | undefined;
if (x) {
  x.trim();
  setTimeout(() => {
    // x.trim() TS2352: Object is possibly 'undefined'.
  });
}

class Person {
  greet() {}
}
let p1: Person | undefined;
if (p1 instanceof Person) {
  p1.greet();
  const innerFn = () => {
    // p1.greet(); TS2352: Object is possibly 'undefined'.
  };
}

let p2: Person | undefined;

const innerFn = () => {
  if (p2 instanceof Person) {
    p2.greet();
  }
};

setTimeout(() => {
  if (x) {
    x.trim();
  }
});

// 单元测试
// 使用 @ts-expect-error 标记代码中的类型错误❎

// @ts-expect-error
const n: number = '42';
