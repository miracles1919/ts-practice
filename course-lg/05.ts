// ts函数类型中的 => 用来表示函数的定义，左侧是函数的参数类型，右侧是返回值类型
{
  type Sum = (a: number, b: number) => number;
  const sum: Sum = (a, b) => a + b;
}

// 可缺省和可推断的返回值类型
{
  const fun = (a: string, b: number) => {
    const strs = [a];
    const nums = [b];
    return {
      strs, // string[]
      nums, // number[]
    };
  };
}

// generator
{
  type AnyType = boolean;
  type AntRuturnType = string;
  type AnyNextType = number;

  // interface Generator<T = unknown, TReturn = any, TNext = unknown>
  function* gen(): Generator<AnyType, AntRuturnType, AnyNextType> {
    const nextValue = yield true; // nextValue 类型是 number，yiled 后面必须是 boolean
    return `${nextValue}`; // 返回必须是 string
  }
}

{
  // 剩余参数
  const sum = (...nums: number[]) => nums.reduce((a, b) => a + b, 0);

  const sum2 = (...nums: (number | string)[]) =>
    nums.reduce<number>((a, b) => a + Number(b), 0);
}

// this
// ts中，this需要显式指定
function say(this: Window) {
  console.log(this.name);
}
window.name = 'ts';

// say(); The 'this' context of type 'void' is not assignable to method's 'this' of type 'Window'.
window.say();

interface Person {
  name: string;
  say(this: Person): void;
}

const person: Person = {
  name: 'ts',
  say() {
    console.log(this.name);
  },
};

const p = person.say;
// p() The 'this' context of type 'void' is not assignable to method's 'this' of type 'Person'.

// ----------
// 函数重载
{
  const convert = (x: string | number | null): string | number | -1 => {
    if (typeof x === 'string') {
      return Number(x);
    }

    if (typeof x === 'number') {
      return String(x);
    }

    return -1;
  };

  const x1 = convert('1'); // string | number
  const x2 = convert(1); // string | number
  const x3 = convert(null); // string | number
}

function convert(x: string): number;
function convert(x: number): string;
function convert(x: null): -1;
function convert(x: string | number | null): string | number | -1 {
  if (typeof x === 'string') {
    return Number(x);
  }

  if (typeof x === 'number') {
    return String(x);
  }

  return -1;
}

{
  const x1 = convert('1'); // number
  const x2 = convert(1); // string
  const x3 = convert(null); // -1
}

{
  interface P1 {
    name: string;
  }

  interface P2 extends P1 {
    age: number;
  }

  function fun(x: P1): number;
  function fun(x: P2): string;
  function fun(x: P1 | P2): any {}
  const x1 = fun({ name: '' }); // number
  const x2 = fun({ name: '', age: 18 }); // string
  const x3 = fun({ name: '', age: 18 } as P2); // number
}

// -------
// 类型谓词 is 适合场景是自定义类型守卫
function isString(s: unknown): s is string {
  return typeof s === 'string';
}
function isNumber(n: number) {
  return typeof n === 'number';
}

function operator(x: unknown) {
  if (isString(x)) {
    // 有 s is string 的时候 x的类型为 string
    // 没有 is 的时候 x的类型为 unknown
    console.log(x);
  }

  // if (isNumber(x)) {}  Argument of type 'unknown' is not assignable to parameter of type 'number'.
}
