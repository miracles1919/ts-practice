// 类型推断
{
  // 推断出x的类型是 number
  let x = 42;
  let y: number = x;
}

{
  // 根据参数类型推断出返回值的类型也是 number
  function sum(a: number, b: number) {
    return a + b;
  }

  const x = sum(1, 2);

  // b是 number | undefined
  function sum2(a: number, b = 1) {
    return a + b;
  }

  const y = sum2(1);
}

// 字面量类型拓宽 literal widening
{
  let str = 'hello world'; // str: string
  let num = 1; // num: number
  let bool = true; // bool: boolean
}

// 字面量类型，是集合类型的子类型
{
  const str = 'hello world'; // str: "hello world"
  const num = 1; // num: 1
  const bool = true; // bool: true
}

// 上下文推断
{
  type Sum = (a: number, b: number) => number;
  const sum: Sum = (a, b) => a + b;
}

// 类型拓宽 type widening
{
  let x = null; // x: any
  let y = undefined; // y: any

  const z = null; // z: null

  let x2 = x; // x2: null
  let y2 = y; // y2: undefined
  let fun = (params = null) => params; // (params?: null) => null
}

// 类型缩小 type narrowing
{
  // 类型守卫
  let func = (params: any) => {
    if (typeof params === 'string') {
      return params; // 类型是 string
    } else if (typeof params === 'number') {
      return params; // 类型是 number
    }
    return null;
  };
}
