/**
 * 

// js 解构
function studyJs({ name, age }) {
  console.log(name, age)
}

// ts 结构和内联类型
function studyTs({ name, age }: { name: string, age: () => number }) {
  console.log(name, age)
}

// js 解构、设置别名
function studyJs({ name: aliasName }) {
  console.log(aliasName)
}

function studyTs(language: { name: string }) {
  // 不能直接使用 name
  console.log(language.name)
}

 * 
 */

// interface 接口类型
interface OptionalProgramLanguage {
  readonly name: string;
  age?: () => number;
}

// 函数类型
interface StudyLanguage {
  (language: OptionalProgramLanguage): void;
}

const study: StudyLanguage = (language) =>
  console.log(language.name, language.age?.());

// 索引签名
interface LanguageRankInterface {
  [rank: number]: string;
}

interface LanguageYearInterface {
  [name: string]: number;
}

const LangeuageMap: LanguageYearInterface = {
  JavaScript: 1995,
  TypeScript: 2012,
  1: 1979, // 数字作为对应索引时，类型可以和数字兼容，也可以和字符串兼容，即 1 和 '1' 等价
};

{
  interface StringMap {
    [prop: string]: number;
    age: number;
    // name: string; Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
  }

  interface NumberMap {
    [rank: number]: string;
    1: string;
    // 2: number; Property '2' of type 'number' is not assignable to 'number' index type 'string'.
  }
}

{
  interface LanguageRankInterface {
    // [rank: number]: string;  'number' index type 'string' is not assignable to 'string' index type 'number'.
    [prop: string]: number;
  }
}

// 继承与实现

interface DynamicLanguage extends OptionalProgramLanguage {
  rank: number;
}

interface TypeSafeLanguage extends OptionalProgramLanguage {
  typeChecker: string;
}

interface TypeScriptLanguage extends DynamicLanguage, TypeSafeLanguage {
  name: 'TypeScript';
}

// 仅能使用兼容的类型覆盖继承的属性
// Interface 'WrongTypeLanguage' incorrectly extends interface 'OptionalProgramLanguage'.
// Types of property 'name' are incompatible.
// Type 'number' is not assignable to type 'string'.
// interface WrongTypeLanguage extends OptionalProgramLanguage {
//   name: number
// }

// 类实现接口
class LangeuageClass implements OptionalProgramLanguage {
  name: string = '';
  age = () => new Date().getFullYear() - 2012;
}

// type 类型别名
{
  type LangeuageType = {
    name: string;
    age: () => number;
  };
}

// 接口类型无法覆盖的场景 ------
// 组合类型
{
  type MixedType = string | number;
}

// 交叉类型
{
  type IntersectionType = { id: number; name: string } & {
    age: number;
    name: string;
  };
}

// 提取接口属性类型
{
  type AgeType = OptionalProgramLanguage['age'];
}

// ----------------

// 区别
{
  // 重复定义的接口类型 属性会叠加
  interface Langeuage {
    id: number;
  }
  interface Langeuage {
    name: string;
  }
  const lang: Langeuage = {
    id: 1,
    name: 'name',
  };
}

{
  // Duplicate identifier 'Langeuage'
  // type Langeuage = {
  //   id: number
  // }

  // type Langeuage = {
  //   name: string;
  // }
}
