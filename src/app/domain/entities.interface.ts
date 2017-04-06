export interface Err {
  
}

export interface Auth {
  user?: User;
  err?: Err;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Todo{
  id: string;
  desc: string;
  completed: string;
}

export interface AppState{
  todos: Todo[];
  auth: Auth;
}