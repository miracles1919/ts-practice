function identity<T>(params: T) {
  return params;
}

const str = identity<string>('str');
const num = identity<number>(1);
const str2 = identity('str2');
const num2 = identity(2);
let str3 = identity('str3');
let num3 = identity(3);

function useState<S>(state: S, initialValue: S) {
  return [state, (s: S) => void 0] as unknown as [S, (s: S) => void];
}

// 泛型类
class Memory<S> {
  store: S;
  constructor(store: S) {
    this.store = store;
  }

  set(store: S) {
    this.store = store;
  }

  get() {
    return this.store;
  }
}

const numMemory = new Memory<number>(1);
numMemory.get();
const numMemory2 = new Memory(1); // number 可缺省

// 泛型类型
const identityFn: <T>(params: T) => T = identity;

type IdentityFunction = <T>(params: T) => T;
interface IIdentityFunction {
  <T>(params: T): T;
}

const identityFn2: IdentityFunction = identity;
const identityFn3: IIdentityFunction = identity;

// 接受入参 T 的泛型类型
type GenericFun<T> = (param: T) => T;
interface IGenericFun<T> {
  (param: T): T;
}

const fn1: GenericFun<string> = identity; // 具象化泛型
const fn2: IGenericFun<number> = identity;
const f1Return = fn1('string');
const f2Return = fn2(1);

// 类型操作符
type StringOrNumberArray<E> = E extends string | number ? E[] : E;
type StringArray = StringOrNumberArray<string>;
type NumberArray = StringOrNumberArray<number>;
type NeverGot = StringOrNumberArray<boolean>;

// 分配条件类型
type BooleanString = string | boolean;
type BooleanOrStringGot = StringOrNumberArray<BooleanString>; // boolean | string[]
type BooleanOrStringGot2 = BooleanString extends string | number // string | boolean
  ? BooleanString[]
  : BooleanString;

// redux model
interface ReduxModel<State> {
  state: State;
  reducers: {
    [action: string]: (state: State, action: any) => State;
  };
}

type ModelInterface = { id: number; name: string };
const model: ReduxModel<ModelInterface> = {
  state: {
    id: 0,
    name: 'redux',
  },
  reducers: {
    setName: (state, action: { payload: string }) => ({
      ...state,
      name: action.payload,
    }),
  },
};

// 泛型约束
function identitySpecified<T extends number | string>(params: T) {
  return params;
}

interface ReduxModelSpecified<State extends { id: number; name: string }> {
  state: State;
}
type ComputedReduxModel1 = ReduxModelSpecified<{ id: number; name: string }>;

interface ObjSetter {
  <O extends {}, K extends keyof O, V extends O[K]>(
    obj: O,
    key: K,
    value: V
  ): void;
}

const setValOfObj: ObjSetter = (obj, key, val) => {
  obj[key] = val;
};

setValOfObj({ id: 1, name: 'x' }, 'id', 1);
setValOfObj({ id: 1, name: 'x' }, 'name', 'y');

// 默认值
interface ReduxModelMixed<State extends {} = { id: number; name: string }> {
  state: State;
}
