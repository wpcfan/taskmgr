import { RouterState } from '@ngrx/router-store';

export interface Err {
  timestamp?: Date;
  status?: number;
  error?: string;
  exception?: string;
  message?: string;
  path?: string;
}

export interface Auth {
  user?: User;
  err?: Err;
  token?: string;
}

export interface User {
  id?: string;
  username: string;
  password?: string;
  name?: string;
  email?: string;
}

export interface Todo{
  id?: string;
  desc?: string;
  completed?: boolean;
  userId?: string;
}

export interface AppState{
  todos: Todo[];
  auth: Auth;
  router: RouterState;
}