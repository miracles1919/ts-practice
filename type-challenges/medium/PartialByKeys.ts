{
  type PartialByKeys<T, K = keyof T> = {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  } extends infer U
    ? { [P in keyof U]: U[P] }
    : never;

  type PartialByKeys2<T, K = keyof T> = Omit<
    Omit<T, K & keyof T> & Partial<T>,
    never
  >;

  interface User {
    name: string;
    age: number;
    address: string;
  }
  type UserPartialName = PartialByKeys<User, 'name'>; // { name?:string; age:number; address:string }
  type UserPartialNameAndUnknown = PartialByKeys<User, 'name' | 'unknown'>; // { name?:string; age:number; address:string }
}
