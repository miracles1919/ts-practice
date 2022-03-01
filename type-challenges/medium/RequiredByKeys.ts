{
  type RequiredByKeys<T, K = keyof T> = {
    [P in keyof T as P extends K ? P : never]-?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  } extends infer U
    ? {
        [P in keyof U]: U[P];
      }
    : never;

  type RequiredByKeys2<T, K = keyof T> = Omit<
    Omit<T, K & keyof T> & Required<Pick<T, K & keyof T>>,
    never
  >;

  interface User {
    name?: string;
    age?: number;
    address?: string;
  }

  type u1 = RequiredByKeys2<User, 'name'>;

  type UserPartialName = RequiredByKeys<User, 'name'>; // { name: string; age?: number; address?: string }
}
