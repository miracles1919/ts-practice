// 类型守卫
{
  const convertToUpperCase = (strOrArray: string | string[]) => {
    if (typeof strOrArray === 'string') {
      return strOrArray.toUpperCase();
    } else if (Array.isArray(strOrArray)) {
      return strOrArray.map((item) => item.toUpperCase());
    }
  };
}

// switch
{
  const convert = (val: 'a' | 1) => {
    switch (val) {
      case 'a':
        return val;
      case 1:
        return val;
    }
  };
}

// 字面量恒等
{
  const convert = (val: 'a' | 1) => {
    if (val === 'a') {
      return val;
    } else if (val === 1) {
      return val;
    }
  };
}

// typeof
{
  const convert = (val: 'a' | 1) => {
    if (typeof val === 'string') {
      return val;
    } else if (typeof val === 'number') {
      return val;
    }
  };
}

// instanceof
{
  class Dog {
    wang = 'wang wang';
  }

  class Cat {
    miao = 'miao miao';
  }

  const bark = (animal: Dog | Cat) => {
    if (animal instanceof Dog) {
      return animal.wang;
    } else {
      return animal.miao;
    }
  };
}

interface Dog {
  wang: string;
}

interface Cat {
  miao: string;
}

// in
{
  const bark = (animal: Dog | Cat) => {
    // if (animal instanceof Dog) {
    //   return animal.wang;  // Property 'wang' does not exist on type 'Cat & Dog'.
    // }

    if ('wang' in animal) {
      return animal.wang;
    } else {
      return animal;
    }
  };
}

// 自定义类型守卫
{
  const isDog = function (animal: Dog | Cat): animal is Dog {
    return 'wang' in animal;
  };

  const bark = (animal: Dog | Cat) => {
    if (isDog(animal)) {
      return animal.wang;
    }
  };
}
