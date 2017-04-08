import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { Todo } from '../domain/entities.interface';

export const ActionTypes = {
  VISIBILITY_ALL_TODOS:       type('[Todo] Set Todos Visibility To All'),
  VISIBILITY_ACTIVE_TODOS:    type('[Todo] Set Todos Visibility To Active'),
  VISIBILITY_COMPLETED_TODOS: type('[Todo] Set Todos Visibility To Completed') 
}

export class VisibilityAllTodosAction implements Action {
  type = ActionTypes.VISIBILITY_ALL_TODOS;
  constructor(public payload: Todo){}
}

export class VisibilityActiveTodosAction implements Action {
  type = ActionTypes.VISIBILITY_ACTIVE_TODOS;
  constructor(public payload: Todo){}
}

export class VisibilityCompletedTodosAction implements Action {
  type = ActionTypes.VISIBILITY_COMPLETED_TODOS;
  constructor(public payload: Todo){}
}


export type Actions
  = VisibilityAllTodosAction
  | VisibilityActiveTodosAction
  | VisibilityCompletedTodosAction