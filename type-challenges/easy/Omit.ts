{
  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type MyExclude<T, U> = T extends U ? never : T;

  type MyOmit<T, K extends keyof any> = MyPick<T, MyExclude<keyof T, K>>;

  type MyOmit2<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
  };
  
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

  const todo: TodoPreview = {
    completed: false,
  };
}
