// public、private、protected
// private 只有基类可以使用；protected 在基类和派生类中都可以使用
class Animal {
  public name: string;
  private age: number;
  protected type: string = 'animal';
  public readonly color = 'black';

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getAnimalAge() {
    return this.age;
  }

  getAnimalType() {
    return this.type;
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
  }

  // Property 'age' is private and only accessible within class 'Animal'.
  // getAge() {
  //   return this.age;
  // }

  getType() {
    return this.type;
  }
}

const d1 = new Dog('dog', 1);

// Property 'age' is private and only accessible within class 'Animal'.
// d1.age

// Property 'type' is protected and only accessible within class 'Animal' and its subclasses.
// d1.type

// 存取器
class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
  }
  get myName() {
    return this.name;
  }

  set myName(name: string) {
    if (name !== 'dog') {
      this.name = name;
    } else {
      console.error('Unable to change name');
    }
  }
}

const cat = new Cat('cat', 2);
console.log(cat.myName); // cat
cat.myName = 'dog'; // Unable to change name

// 静态属性
class MyArray {
  static isArray(obj: unknown) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Array';
  }
}

// 抽象类
abstract class Adder {
  abstract x: number;
  abstract y: number;
  abstract add(): number;
  displayName = 'Adder';
  addTwice(): number {
    return (this.x + this.y) * 2;
  }
}

class NumAdder extends Adder {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
  add() {
    return this.x + this.y;
  }
}

const n1 = new NumAdder(1, 2);
console.log(n1.displayName);
console.log(n1.add());
console.log(n1.addTwice());

// 类的类型
class X {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// Property 'name' is missing in type '{}' but required in type 'X'.
// const x1: X = {};
const x2: X = { name: 'x2' };
