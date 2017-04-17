import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import * as models from '../domain';

export const ActionTypes = {
  ADD_TODO:                   type('[Collection] Add Todo'),
  ADD_TODO_SUCCESS:           type('[Collection] Add Todo Success'),
  ADD_TODO_FAIL:              type('[Collection] Add Todo Fail'),
  REMOVE_TODO:                type('[Collection] Remove Todo'),
  REMOVE_TODO_SUCCESS:        type('[Collection] Remove Todo Success'),
  REMOVE_TODO_FAIL:           type('[Collection] Register Fail'),
  TOGGLE_TODO:                type('[Collection] Toggle Todo'),
  TOGGLE_TODO_SUCCESS:        type('[Collection] Toggle Todo Success'),
  TOGGLE_TODO_FAIL:           type('[Collection] Toggle Todo Fail'),
  TOGGLE_ALL:                 type('[Collection] Toggle All'),
  TOGGLE_ALL_SUCCESS:         type('[Collection] Toggle All Success'),
  TOGGLE_ALL_FAIL:            type('[Collection] Toggle All Fail'),
  CLEAR_COMPLETED:            type('[Collection] Clear Completed'),
  CLEAR_COMPLETED_SUCCESS:    type('[Collection] Clear Completed Success'),
  CLEAR_COMPLETED_FAIL:       type('[Collection] Clear Completed Fail'),
  LOAD_TODOS:                 type('[Collection] Load Todos'),
  LOAD_TODOS_SUCCESS:         type('[Collection] Load Todos Success'),
  LOAD_TODOS_FAIL:            type('[Collection] Load Todos Fail'),
  SET_VISIBILITY_FILTER:      type('[Collection] Set Visibility Filter')
};

export class AddTodoAction implements Action {
  type = ActionTypes.ADD_TODO;
  constructor(public payload: string){}
}

export class AddTodoSuccessAction implements Action {
  type = ActionTypes.ADD_TODO_SUCCESS;
  constructor(public payload: models.Todo){}
}

export class AddTodoFailAction implements Action {
  type = ActionTypes.ADD_TODO_FAIL;
  constructor(public payload: models.Err){}
}

export class RemoveTodoAction implements Action {
  type = ActionTypes.REMOVE_TODO;
  constructor(public payload: models.Todo){}
}

export class RemoveTodoSuccessAction implements Action {
  type = ActionTypes.REMOVE_TODO_SUCCESS;
  constructor(public payload: models.Todo){}
}

export class RemoveTodoFailAction implements Action {
  type = ActionTypes.REMOVE_TODO_FAIL;
  constructor(public payload: models.Err){}
}

export class ToggleTodoAction implements Action {
  type = ActionTypes.TOGGLE_TODO;
  constructor(public payload: models.Todo){}
}

export class ToggleTodoSuccessAction implements Action {
  type = ActionTypes.TOGGLE_TODO_SUCCESS;
  constructor(public payload: models.Todo){}
}

export class ToggleTodoFailAction implements Action {
  type = ActionTypes.TOGGLE_TODO_FAIL;
  constructor(public payload: models.Err){}
}

export class ToggleAllAction implements Action {
  type = ActionTypes.TOGGLE_ALL;
  constructor(public payload: models.Todo){}
}

export class ToggleAllSuccessAction implements Action {
  type = ActionTypes.TOGGLE_ALL_SUCCESS;
  constructor(public payload: models.Todo){}
}

export class ToggleAllFailAction implements Action {
  type = ActionTypes.TOGGLE_ALL_FAIL;
  constructor(public payload: models.Err){}
}

export class ClearCompletedAction implements Action {
  type = ActionTypes.CLEAR_COMPLETED;
  constructor(public payload: any){}
}

export class ClearCompletedSuccessAction implements Action {
  type = ActionTypes.CLEAR_COMPLETED_SUCCESS;
  constructor(public payload: any){}
}

export class ClearCompletedFailAction implements Action {
  type = ActionTypes.CLEAR_COMPLETED_FAIL;
  constructor(public payload: models.Err){}
}

export class LoadTodosAction implements Action {
  type = ActionTypes.LOAD_TODOS;
  constructor(public payload: any){}
}

export class LoadTodosSuccessAction implements Action {
  type = ActionTypes.LOAD_TODOS_SUCCESS;
  constructor(public payload: models.Todo[]){}
}

export class LoadTodosFailAction implements Action {
  type = ActionTypes.LOAD_TODOS_FAIL;
  constructor(public payload: models.Err){}
}

export class SetVisibilityFilterAction implements Action {
  type = ActionTypes.SET_VISIBILITY_FILTER;
  constructor(public payload: string){}
}

export type Actions
  = AddTodoAction
  | AddTodoSuccessAction
  | AddTodoFailAction
  | RemoveTodoAction
  | RemoveTodoSuccessAction
  | RemoveTodoFailAction
  | ToggleTodoAction
  | ToggleTodoSuccessAction
  | ToggleTodoFailAction
  | ToggleAllAction
  | ToggleAllSuccessAction
  | ToggleAllFailAction
  | ClearCompletedAction
  | ClearCompletedSuccessAction
  | ClearCompletedFailAction
  | LoadTodosAction
  | LoadTodosSuccessAction
  | LoadTodosFailAction
  | SetVisibilityFilterAction;