// 联合类型 Unions Types |
type Size = number | string;
type Unit = 'px' | 'em' | 'rem' | '%';

function formatUnit(size: Size, unit: Unit = 'px') {}

formatUnit(1);
formatUnit(1, 'em');

// 联合类型只能访问共有成员
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  return {
    // ...
  } as Fish | Bird;
}

const pet = getSmallPet();
pet.layEggs();

// pet.fly();  // Property 'fly' does not exist on type 'Bird | Fish'. Property 'fly' does not exist on type 'Fish'.

// 类型守卫
// if (typeof pet.fly === 'function') {} // Property 'fly' does not exist on type 'Bird | Fish'. Property 'fly' does not exist on type 'Fish'.

if ('fly' in pet) {
  pet.fly();
}

// 交叉类型 Intersection Types &

{
  type Useless = string & number; // never
}

type PersonType = { name: string } & { age: number };
const mixed: PersonType = {
  name: 'p',
  age: 18,
};

// 同名属性不兼容
type PersonTypeConflict = { name: string; age: number } & {
  name: number;
  id: number;
};

// 不设置 name 会提示缺少 name；设置 name 会提示类型错误
// const mixedConflict: PersonTypeConflict = {
//   id:1 ,
//   name: 'p', // Type 'string' is not assignable to type 'never'.
//   age: 18
// }

// 合并联合类型
type UnitA = 'px' | 'em' | 'rem' | '%';
type UnitB = 'vh' | 'em' | 'rem' | 'pt';
type IntersectUnit = UnitA & UnitB;
const u1: IntersectUnit = 'em';
// const u2: IntersectUnit = 'px'; // Type '"px"' is not assignable to type '"em" | "rem"'.

// string 原始类型和 string 字面量类型
type StirngAndLiteralString = string | 'str';

// 缺少 IDE 提示
type BorderColorA = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string;

// 黑魔法
type BorderColorB =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | (string & {});

// 实现 age 属性是数字类型，其他属性是字符串类型
const obj = {
  age: 1, // number
  otherProp: 'string', // string
};

// never 是所有类型的子类型
type UnionInterce = { age: number } | { age: never; [key: string]: string };

const o: UnionInterce = {
  age: 1,
  name: '11',
}